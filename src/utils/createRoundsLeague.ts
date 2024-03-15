import * as Crypto from 'expo-crypto'
import { ClubShort } from '../Model/Club'
import { MatchShort } from '../Model/Match'
import { Round } from '../Model/Round'

interface MatchLeague {
  home: ClubShort
  away: ClubShort
}

interface RoundLeague {
  index: number
  matchs: MatchLeague[]
}

interface MatchSequence {
  home: number
  away: number
}

function roundRobin(numberClubs: number): number[][][] {
  // eslint-disable-next-line
  const robin = require('roundrobin')

  return robin(numberClubs)
}

interface InvertedMatchBySequenceProps {
  matchSequenceClub1: MatchSequence
  matchSequenceClub2: MatchSequence
}

function invertedMatchBySequence({
  matchSequenceClub1,
  matchSequenceClub2,
}: InvertedMatchBySequenceProps) {
  if (matchSequenceClub1.home >= 2) return true
  if (matchSequenceClub2.away >= 2) return true
  if (matchSequenceClub1.home >= 1 || matchSequenceClub2.away >= 1) return true

  return false
}

function convertedRoundLeagueInRound(roundsLeague: RoundLeague[]): Round[] {
  const rounds: Round[] = roundsLeague.map((round) => {
    const matchs: MatchShort[] = round.matchs.map((match, index) => ({
      homeIdClub: match.home.id,
      awayIdClub: match.away.id,
      idStats: Crypto.randomUUID(),
      idStatsTrip: undefined,
      numberMatch: index,
    }))
    const roundLeague: Round = {
      numberRound: round.index,
      matchs,
      cod: 'stantard',
    }
    return roundLeague
  })
  return rounds
}

export function createRoundsLeague(clubs: ClubShort[]): Round[] {
  const numberClubs = clubs.length

  const roundsInNumbers = roundRobin(numberClubs)
  const clubsWithMatchSequence = clubs.map((club) => ({
    club,
    matchSequence: {
      home: 0,
      away: 0,
    },
  }))

  const rounds: RoundLeague[] = roundsInNumbers.map((matchs, index) => {
    const matchsLeagueInRound: MatchLeague[] = matchs.map(([home, away]) => {
      const homeClub = clubsWithMatchSequence[home - 1]
      const awayClub = clubsWithMatchSequence[away - 1]
      const isInvertedMatch = invertedMatchBySequence({
        matchSequenceClub1: homeClub.matchSequence,
        matchSequenceClub2: awayClub.matchSequence,
      })
      if (isInvertedMatch) {
        clubsWithMatchSequence[home - 1].matchSequence = {
          home: 0,
          away: homeClub.matchSequence.away + 1,
        }
        clubsWithMatchSequence[away - 1].matchSequence = {
          home: awayClub.matchSequence.home + 1,
          away: 0,
        }
        return {
          home: awayClub.club,
          away: homeClub.club,
        }
      } else {
        clubsWithMatchSequence[home - 1].matchSequence = {
          home: homeClub.matchSequence.home + 1,
          away: 0,
        }
        clubsWithMatchSequence[away - 1].matchSequence = {
          home: 0,
          away: awayClub.matchSequence.away + 1,
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

  return convertedRoundLeagueInRound(rounds)
}
