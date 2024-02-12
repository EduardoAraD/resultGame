import { ReactNode, createContext, useState } from 'react'

import { saveMatchStats } from '../lib/asyncstorage/matchs'

import { MatchComplete, MatchStats } from '../Model/Match'

interface MatchProviderProps {
  children: ReactNode
}

interface InfoCupMatch {
  id: string
  name: string
  round: number
}

interface MatchCurrent extends MatchComplete {
  cup: InfoCupMatch
}

type MatchContextDataProps = {
  match: MatchCurrent | undefined
  saveMatch: (match: MatchComplete, cup: InfoCupMatch) => void
  updateStatsMatch: (stats: MatchStats) => Promise<void>
  removeMatch: () => void
}

export const MatchContext = createContext<MatchContextDataProps>(
  {} as MatchContextDataProps,
)

export function MatchProvider({ children }: MatchProviderProps) {
  const [match, setMatch] = useState<MatchCurrent | undefined>(undefined)

  function saveMatch(match: MatchComplete, cup: InfoCupMatch) {
    setMatch({ ...match, cup })
  }

  async function updateStatsMatch(stats: MatchStats) {
    if (match) {
      const newMatch: MatchCurrent = {
        ...match,
        ...stats,
      }
      setMatch(newMatch)
      await saveMatchStats(stats)
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
