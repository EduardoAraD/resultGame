import { ClubShort } from '../Model/Club'

interface MatchLeague {
  home: ClubShort
  away: ClubShort
  indexRound: number
}

interface RoundLeague {
  index: number
  matchs: MatchLeague[]
}

interface Match extends MatchLeague {
  option: number
}

export function createRoundsLeague(clubs: ClubShort[]): RoundLeague[] {
  let matchs: Match[] = []
  const numberClubs = clubs.length
  let inverted = false

  for (let i = 0; i < numberClubs; i++) {
    for (let j = i + 1; j < numberClubs; j++) {
      if (inverted) {
        const m: Match = {
          home: clubs[j],
          away: clubs[i],
          indexRound: 0,
          option: 0,
        }
        matchs.push(m)
        inverted = false
      } else {
        const m: Match = {
          home: clubs[i],
          away: clubs[j],
          indexRound: 0,
          option: 0,
        }
        matchs.push(m)
        inverted = true
      }
    }
  }
  const numberOfMatchs = matchs.length

  const numberMatchsOfRound = Math.floor(numberClubs / 2)
  const numberRound = numberOfMatchs / numberMatchsOfRound
  const rounds: RoundLeague[] = []
  Array.from({ length: numberRound }).forEach((i, index) => {
    const rod: RoundLeague = {
      index,
      matchs: [],
    }
    rounds.push(rod)
  })

  for (let m = 0; m < matchs.length; m++) {
    const match = matchs[m]
    const filterOptionRound = rounds.filter((rod) => {
      let clubsAreInRound = false
      for (const mat of rod.matchs) {
        if (mat.home === match.home || mat.home === match.away) {
          clubsAreInRound = true
          break
        } else if (mat.away === match.home || mat.away === match.away) {
          clubsAreInRound = true
          break
        }
      }
      return !clubsAreInRound
    })
    if (filterOptionRound.length > match.option) {
      const findRound = filterOptionRound[match.option].index
      match.indexRound = findRound
      rounds[findRound].matchs.push(match)
      matchs = matchs.map((i, index) => (index > m ? { ...i, option: 0 } : i))
    } else {
      const indexRodada = matchs[m - 1].indexRound
      matchs[m - 1].option += 1
      rounds[indexRodada].matchs.pop()
      m = m - 2
    }
  }

  return rounds
}
