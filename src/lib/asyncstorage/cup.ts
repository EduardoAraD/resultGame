import AsyncStorage from '@react-native-async-storage/async-storage'

import { KEY_CUP } from './dataStorage'

import { CupComplete, CupShort } from '../../Model/Cup'

import { removeAllRoundsByCup } from './matchs'

export async function getListCup(): Promise<CupShort[]> {
  const list = await AsyncStorage.getItem(KEY_CUP)
  if (list) {
    const listCups: CupShort[] = JSON.parse(list)
    return listCups
  }
  return []
}

export async function getCupComplete(
  idCup: string,
): Promise<CupComplete | undefined> {
  const cupDB = await AsyncStorage.getItem(`${KEY_CUP}/${idCup}`)
  if (cupDB) {
    const cup: CupComplete = JSON.parse(cupDB)
    return cup
  }
  return undefined
}

async function saveNewCupShort(newCup: CupShort) {
  const cups = await getListCup()
  const newList = [...cups, newCup]
  await AsyncStorage.setItem(KEY_CUP, JSON.stringify(newList))
}

async function createCupComplete(newCup: CupComplete) {
  await AsyncStorage.setItem(`${KEY_CUP}/${newCup.id}`, JSON.stringify(newCup))
}

export async function createCup(newCup: CupComplete) {
  const cupShort: CupShort = {
    name: newCup.name,
    type: newCup.type,
    numberClubs: newCup.numberClubs,
    status: newCup.status,
    id: newCup.id,
  }

  await Promise.all([saveNewCupShort(cupShort), createCupComplete(newCup)])
}

async function saveListShort(newList: CupShort[]) {
  await AsyncStorage.setItem(KEY_CUP, JSON.stringify(newList))
}

export async function updateCup(cup: CupComplete) {
  const listCup = await getListCup()
  const cupShort: CupShort = {
    name: cup.name,
    type: cup.type,
    numberClubs: cup.numberClubs,
    status: cup.status,
    id: cup.id,
  }
  const newList = listCup.map((i) => (i.id === cupShort.id ? cupShort : i))
  await Promise.all([saveListShort(newList), createCupComplete(cup)])
}

async function removeCupComplete(idCup: string) {
  await AsyncStorage.removeItem(`${KEY_CUP}/${idCup}`)
}

export async function removeCup(idCup: string) {
  const listCup = await getListCup()
  const cup = listCup.find((cupDB) => cupDB.id === idCup)
  if (cup !== undefined) {
    const filterListCup = listCup.filter((item) => item.id !== idCup)
    await Promise.all([
      saveListShort(filterListCup),
      removeCupComplete(idCup),
      removeAllRoundsByCup(idCup),
    ])
  }
}
