import AsyncStorage from '@react-native-async-storage/async-storage'

import { KEY_MATCH, KEY_ROUND } from './dataStorage'

import { MatchStats, emptyMatchStats } from '../../Model/Match'
import { Round } from '../../Model/Round'

export async function saveRoundsInCup(rounds: Round[], idCup: string) {
  await AsyncStorage.setItem(`${KEY_ROUND}/${idCup}`, JSON.stringify(rounds))
}

export async function getRoundsCup(idCup: string) {
  const roundCup = await AsyncStorage.getItem(`${KEY_ROUND}/${idCup}`)
  if (roundCup) {
    const rounds: Round[] = JSON.parse(roundCup)
    return rounds
  }
  return []
}

export async function removeAllRoundsByCup(idCup: string) {
  const roundCup = await getRoundsCup(idCup)
  if (roundCup.length > 0) {
    await Promise.all(
      roundCup.map(
        async (round) =>
          await Promise.all(
            round.matchs.map(async (match) => {
              if (match.idStatsTrip !== undefined) {
                await Promise.all([
                  removeMatchStats(match.idStats),
                  removeMatchStats(match.idStatsTrip),
                ])
              } else {
                await removeMatchStats(match.idStats)
              }
            }),
          ),
      ),
    )
  }
}

export async function getMatchStats(idMatch: string): Promise<MatchStats> {
  const matchDB = await AsyncStorage.getItem(`${KEY_MATCH}/${idMatch}`)
  if (matchDB) {
    const match: MatchStats = JSON.parse(matchDB)
    return match
  }
  return { ...emptyMatchStats, id: idMatch }
}

export async function saveMatchStats(newMatch: MatchStats) {
  await AsyncStorage.setItem(
    `${KEY_MATCH}/${newMatch.id}`,
    JSON.stringify(newMatch),
  )
}

async function removeMatchStats(idMatch: string) {
  await AsyncStorage.removeItem(`${KEY_MATCH}/${idMatch}`)
}
