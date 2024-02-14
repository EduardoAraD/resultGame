import { ClubShort } from '../Model/Club'
import { CodRound } from '../Model/Round'

interface MatchCup {
  numberMatch: number
  home: ClubShort | undefined
  away: ClubShort | undefined
}

interface RoundCup {
  cod: CodRound
  matchs: MatchCup[]
}

function getCodRoundInCup(numberRound: number, maxRound: number): CodRound {
  switch (numberRound) {
    case 0:
      return 'F'
    case 1:
      return 'SF'
    case 2:
      return 'QF'
    case 3:
      return 'OF'
    default: {
      return `Eliminatória ${maxRound - numberRound}`
    }
  }
}

export function createRoundsCup(
  clubs: ClubShort[],
  hasThirdPlace: boolean,
): RoundCup[] {
  const numberClubs = clubs.length
  let numberRounds = 1
  while (Math.pow(2, numberRounds) < numberClubs) {
    numberRounds += 1
  }
  const clubsSort: ClubShort[] = []
  let clubsAll = [...clubs]
  for (let i = 0; i < numberClubs; i++) {
    const indexRandom = Math.round(Math.random() * (numberClubs - 1 - i))
    clubsSort.push(clubsAll[indexRandom])
    clubsAll = clubsAll.filter((_, index) => index !== indexRandom)
  }

  const rounds = Array.from({ length: numberRounds }).map((_, indexRound) => {
    const numberMatchs = Math.pow(2, indexRound)
    const matchs: MatchCup[] = Array.from({ length: numberMatchs }).map(
      (_, index) => {
        let home: ClubShort | undefined
        if (numberRounds - 1 === indexRound) {
          home = clubsSort.pop()
        }
        return {
          numberMatch: index + 1,
          home,
          away: undefined,
        }
      },
    )
    const r: RoundCup = {
      cod: getCodRoundInCup(indexRound, numberRounds),
      matchs,
    }
    return r
  })
  if (hasThirdPlace) {
    const roundThird: RoundCup = {
      cod: 'T',
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

  clubsSort.forEach((club, index) => {
    rounds[newNumberRounds - 1].matchs[index].away = club
  })
  rounds[newNumberRounds - 1].matchs = rounds[
    newNumberRounds - 1
  ].matchs.filter((match) => {
    if (match.away === undefined) {
      const calc = match.numberMatch / 2
      const index = Math.ceil(calc) - 1
      if (calc % 1 === 0) {
        rounds[newNumberRounds - 2].matchs[index].away = match.home
      } else {
        rounds[newNumberRounds - 2].matchs[index].home = match.home
      }
      return false
    }
    return true
  })

  return rounds
}
