import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { getClubsShort } from '../lib/asyncstorage/clubs'

import { ClubComplete, ClubShort } from '../Model/Club'

interface ClubsProviderProps {
  children: ReactNode
}

type ClubsContextDataProps = {
  clubs: ClubShort[]
}

export const ClubsContext = createContext<ClubsContextDataProps>(
  {} as ClubsContextDataProps,
)

export function ClubsProvider({ children }: ClubsProviderProps) {
  const [clubs, setClubs] = useState<ClubShort[]>([])

  function addClub(club: ClubComplete) {
    console.log('ADD')
  }

  function removePlayer(idClub: string): void {
    console.log('DESATIVE')
  }

  function updateClub(idClub: string, newClub: ClubComplete): void {
    console.log('UPDATE')
  }

  const loadClubs = useCallback(async () => {
    const listClubs = await getClubsShort()
    setClubs(listClubs)
  }, [])

  useEffect(() => {
    loadClubs()
  }, [loadClubs])

  return (
    <ClubsContext.Provider
      value={{
        clubs,
      }}
    >
      {children}
    </ClubsContext.Provider>
  )
}
