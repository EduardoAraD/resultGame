import { ReactNode, createContext, useState } from 'react'

import { saveMatchStats } from '../lib/asyncstorage/matchs'

import { TypeCup } from '../Model/Cup'
import { MatchComplete, MatchStats } from '../Model/Match'

import { classificationClubToProxRound } from '../utils/classificationClubToProxRound'

interface MatchProviderProps {
  children: ReactNode
}

interface RoundMatch {
  name: string
  numberRound: number
  maxRound: number
}

interface InfoCupMatch {
  id: string
  typeCup: TypeCup
  name: string
}

interface MatchCurrent extends MatchComplete {
  cup: InfoCupMatch
  round: RoundMatch
}

type MatchContextDataProps = {
  match: MatchCurrent | undefined
  saveMatch: (
    match: MatchComplete,
    cup: InfoCupMatch,
    round: RoundMatch,
  ) => void
  updateStatsMatch: (stats: MatchStats) => Promise<void>
  removeMatch: () => void
}

export const MatchContext = createContext<MatchContextDataProps>(
  {} as MatchContextDataProps,
)

export function MatchProvider({ children }: MatchProviderProps) {
  const [match, setMatch] = useState<MatchCurrent | undefined>(undefined)

  function saveMatch(
    matchComplete: MatchComplete,
    cup: InfoCupMatch,
    round: RoundMatch,
  ) {
    setMatch({ ...matchComplete, cup, round })
  }

  async function updateStatsMatch(stats: MatchStats) {
    if (match) {
      if (match.statsTrip !== undefined && match.statsTrip.status === 'start') {
        const newMatch: MatchCurrent = {
          ...match,
          statsTrip: stats,
        }
        setMatch(newMatch)
      } else {
        const newMatch: MatchCurrent = {
          ...match,
          stats,
        }
        setMatch(newMatch)
      }
      await saveMatchStats(stats)
      if (stats.type === 'Mata-Mata' || stats.type === 'Volta') {
        await classificationClubToProxRound(
          {
            home: match.home,
            away: match.away,
            statsTrip: match.statsTrip,
            stats,
          },
          match.cup.id,
          {
            numberRound: match.round.numberRound,
            maxRound: match.round.maxRound,
          },
        )
      }
    }
  }

  function removeMatch() {
    setMatch(undefined)
  }

  return (
    <MatchContext.Provider
      value={{
        match,
        saveMatch,
        removeMatch,
        updateStatsMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  )
}
