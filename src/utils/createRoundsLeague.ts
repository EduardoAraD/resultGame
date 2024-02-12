import { ClubShort } from '../Model/Club'

interface MatchLeague {
  home: ClubShort
  away: ClubShort
}

interface RoundLeague {
  index: number
  matchs: MatchLeague[]
}

interface Sequence {
  home: number
  away: number
}

function roundRobin(numberClubs: number): number[][][] {
  // eslint-disable-next-line
  const robin = require('roundrobin')

  return robin(numberClubs)
}

function invertedMatch(sequence: Sequence, sequence2: Sequence) {
  if (sequence.home >= 2) return true
  if (sequence2.away >= 2) return true
  if (sequence.home >= 1 || sequence2.away >= 1) return true

  return false
}

export function createRoundsLeague(clubs: ClubShort[]): RoundLeague[] {
  const numberClubs = clubs.length

  const roundsInNumbers = roundRobin(numberClubs)
  const clubsWithOptions = clubs.map((club) => ({
    club,
    sequence: {
      home: 0,
      away: 0,
    },
  }))

  const rounds: RoundLeague[] = roundsInNumbers.map((matchs, index) => {
    const matchsLeagueInRound: MatchLeague[] = matchs.map(([home, away]) => {
      const homeClub = clubsWithOptions[home - 1]
      const awayClub = clubsWithOptions[away - 1]
      const inverted = invertedMatch(homeClub.sequence, awayClub.sequence)
      if (inverted) {
        clubsWithOptions[home - 1].sequence = {
          home: 0,
          away: homeClub.sequence.away + 1,
        }
        clubsWithOptions[away - 1].sequence = {
          home: awayClub.sequence.home + 1,
          away: 0,
        }
        return {
          home: awayClub.club,
          away: homeClub.club,
        }
      } else {
        clubsWithOptions[home - 1].sequence = {
          home: homeClub.sequence.home + 1,
          away: 0,
        }
        clubsWithOptions[away - 1].sequence = {
          home: 0,
          away: awayClub.sequence.away + 1,
        }
        return {
          home: homeClub.club,
          away: awayClub.club,
        }
      }
    })

    const roundLeague: RoundLeague = {
      index,
      matchs: matchsLeagueInRound,
    }
    return roundLeague
  })

  return rounds
}
