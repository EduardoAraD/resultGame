import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'

import { KEY_CLUB } from './dataStorage'

import { ClubComplete, ClubShort } from '../../Model/Club'

import { clubsPreCreated } from '../../utils/clubs'

async function createdClubs() {
  const clubsComplete: ClubComplete[] = clubes.map((clube) => {
    const id = Crypto.randomUUID()
    const clubComplete: ClubComplete = {
      name: clube.name,
      nameComplete: clube.nameComplete,
      logo: clube.logo,
      id,
      disabled: false,
      sigla: clube.sigla,
      overall: clube.overall,
      stadium: clube.stadium,
      createdForUser: false,
    }
    return clubComplete
  })

  const clubsShort: ClubShort[] = clubsComplete.map((club) => ({
    name: club.name,
    logo: club.logo,
    id: club.id,
    createdForUser: club.createdForUser,
    disabled: club.disabled,
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
    const clubs = await createdClubs()
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
    disabled: club.disabled,
    createdForUser: club.createdForUser,
  }
  const clubsShort = await getClubsShort()
  clubsShort.push(clubShort)
  await Promise.all([saveClubsShort(clubsShort), saveClubComplete(club)])
}

async function removeClubShort(idClub: string) {
  const clubs = await getClubsShort()
  const newClubs: ClubShort[] = clubs.map((i) =>
    i.id === idClub ? { ...i, disabled: !i.disabled } : i,
  )
  await saveClubsShort(newClubs)
}

async function removeClubComplete(idClub: string) {
  const clubComplete = await getClubComplete(idClub)
  if (clubComplete) {
    await saveClubComplete({
      ...clubComplete,
      disabled: !clubComplete.disabled,
    })
  }
}

export async function removeClub(idClub: string) {
  await Promise.all([removeClubShort(idClub), removeClubComplete(idClub)])
}

export async function updateClubDB(idClub: string, newClub: ClubComplete) {
  const clubShort: ClubShort = {
    name: newClub.name,
    logo: newClub.logo,
    id: idClub,
    disabled: newClub.disabled,
    createdForUser: newClub.createdForUser,
  }
  const clubsShort = await getClubsShort()
  const newListClubsShort = clubsShort.map((club) =>
    club.id === idClub ? clubShort : club,
  )
  await saveClubsShort(newListClubsShort)
  await saveClubComplete({ ...newClub, id: idClub })
}

export async function removeAllClubs() {
  const clubs = await getClubsShort()
  await Promise.all(
    clubs.map((club) => AsyncStorage.removeItem(`${KEY_CLUB}/${club.id}`)),
  )

  await AsyncStorage.removeItem(KEY_CLUB)
}
