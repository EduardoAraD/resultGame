import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'

import { KEY_CLUB } from './dataStorage'

import { ClubComplete, ClubShort } from '../../Model/Club'

import { clubes } from '../../utils/clubes'

async function createdClubs() {
  const clubsComplete: ClubComplete[] = clubes.map((club) => {
    const id = Crypto.randomUUID()
    const clubComplete: ClubComplete = {
      name: club.name,
      nameComplete: club.nameComplete,
      logo: club.logo,
      id,
      disabled: false,
      sigla: club.sigla,
      overall: club.overall,
      stadium: club.stadium,
      createdForUser: false,
    }
    return clubComplete
  })

  const clubsShort: ClubShort[] = clubsComplete.map((i) => ({
    name: i.name,
    logo: i.logo,
    id: i.id,
    createdForUser: i.createdForUser,
    disabled: i.disabled,
  }))

  await Promise.all([
    saveClubsShort(clubsShort),
    ...clubsComplete.map(async (i) => await saveClubComplete(i)),
  ])

  return clubsShort
}

export async function getClubsShort(): Promise<ClubShort[]> {
  const clubsJSON = await AsyncStorage.getItem(KEY_CLUB)
  if (!clubsJSON) {
    const clubs = createdClubs()
    return clubs
  } else {
    const clubs: ClubShort[] = JSON.parse(clubsJSON)
    return clubs
  }
}

export async function getClubComplete(
  idClub: string,
): Promise<ClubComplete | undefined> {
  const clubDB = await AsyncStorage.getItem(`${KEY_CLUB}/${idClub}`)
  if (clubDB) {
    const clubComplete = JSON.parse(clubDB)
    return clubComplete
  } else {
    return undefined
  }
}

async function saveClubsShort(clubs: ClubShort[]) {
  await AsyncStorage.setItem(KEY_CLUB, JSON.stringify(clubs))
}

async function saveClubComplete(club: ClubComplete) {
  await AsyncStorage.setItem(`${KEY_CLUB}/${club.id}`, JSON.stringify(club))
}

export async function saveClub(club: ClubComplete) {
  const clubShort: ClubShort = {
    name: club.name,
    logo: club.logo,
    id: club.id,
    disabled: false,
    createdForUser: false,
  }
  const clubsShort = await getClubsShort()
  clubsShort.push(clubShort)
  await Promise.all([saveClubsShort(clubsShort), saveClubComplete(club)])
}

async function removeClubShort(idClub: string) {
  const clubs = await getClubsShort()
  const newClubs: ClubShort[] = clubs.map((i) =>
    i.id === idClub ? { ...i, disabled: true } : i,
  )
  await saveClubsShort(newClubs)
}

async function removeClubComplete(idClub: string) {
  const clubComplete = await getClubComplete(idClub)
  if (clubComplete) {
    await saveClubComplete({ ...clubComplete, disabled: true })
  }
}

export async function removeClub(idClub: string) {
  await Promise.all([removeClubShort(idClub), removeClubComplete(idClub)])
}
