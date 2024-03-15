import * as Crypto from 'expo-crypto'
import { ClubShort } from '../Model/Club'
import { MatchShort } from '../Model/Match'
import { CodRound, Round } from '../Model/Round'

interface MatchCup {
  numberMatch: number
  home: ClubShort | undefined
  away: ClubShort | undefined
}

interface RoundCup {
  cod: CodRound
  matchs: MatchCup[]
}

function getCodRoundInCup(numberOfRound: number): CodRound {
  switch (numberOfRound) {
    case 0:
      return 'final'
    case 1:
      return 'semi'
    case 2:
      return 'quarter'
    case 3:
      return 'round of 16'
    default: {
      return 'knockout stage'
    }
  }
}

interface ConvertedRoundCupInRoundProps {
  roundsCup: RoundCup[]
  hasMatchTrip: boolean
}

function convertedRoundCupInRound({
  roundsCup,
  hasMatchTrip,
}: ConvertedRoundCupInRoundProps): Round[] {
  const rounds: Round[] = roundsCup.map((round, index) => {
    const matchs: MatchShort[] = round.matchs.map((match) => ({
      homeIdClub: match.home !== undefined ? match.home.id : '',
      awayIdClub: match.away !== undefined ? match.away.id : '',
      idStats: Crypto.randomUUID(),
      idStatsTrip: hasMatchTrip ? Crypto.randomUUID() : undefined,
      numberMatch: match.numberMatch,
    }))

    const roundCup: Round = {
      numberRound: index,
      cod: round.cod,
      matchs,
    }
    return roundCup
  })
  return rounds
}

interface CreateRoundCupProps {
  clubs: ClubShort[]
  hasThirdPlace: boolean
  hasMatchTrip: boolean
}

export function createRoundsCup({
  clubs,
  hasThirdPlace,
  hasMatchTrip,
}: CreateRoundCupProps): Round[] {
  const numberClubs = clubs.length

  let numberRounds = 1
  while (Math.pow(2, numberRounds) < numberClubs) {
    numberRounds += 1
  }

  const shuffleClubs: ClubShort[] = []
  let clubsAll = [...clubs]

  for (let i = 0; i < numberClubs; i++) {
    const indexRandom = Math.round(Math.random() * (numberClubs - 1 - i))
    shuffleClubs.push(clubsAll[indexRandom])
    clubsAll = clubsAll.filter((_, index) => index !== indexRandom)
  }

  const rounds = Array.from({ length: numberRounds }).map((_, indexRound) => {
    const numberMatchsInRound = Math.pow(2, indexRound)
    const matchs: MatchCup[] = Array.from({ length: numberMatchsInRound }).map(
      (_, index) => {
        let home: ClubShort | undefined
        if (numberRounds - 1 === indexRound) {
          home = shuffleClubs.pop()
        }
        return {
          numberMatch: index + 1,
          home,
          away: undefined,
        }
      },
    )
    const round: RoundCup = {
      cod: getCodRoundInCup(indexRound),
      matchs,
    }
    return round
  })

  if (hasThirdPlace) {
    const roundThird: RoundCup = {
      cod: 'third',
      matchs: [
        {
          home: undefined,
          away: undefined,
          numberMatch: 1,
        },
      ],
    }
    rounds.splice(1, 0, roundThird)
  }
  const newNumberRounds = rounds.length

  shuffleClubs.forEach((club, index) => {
    rounds[newNumberRounds - 1].matchs[index].away = club
  })

  rounds[newNumberRounds - 1].matchs = rounds[
    newNumberRounds - 1
  ].matchs.filter((match) => {
    if (match.away === undefined) {
      const halfNumberMatchs = match.numberMatch / 2
      const indexMatch = Math.ceil(halfNumberMatchs) - 1
      if (halfNumberMatchs % 1 === 0) {
        rounds[newNumberRounds - 2].matchs[indexMatch].away = match.home
      } else {
        rounds[newNumberRounds - 2].matchs[indexMatch].home = match.home
      }
      return false
    }
    return true
  })

  return convertedRoundCupInRound({ roundsCup: rounds, hasMatchTrip })
}
