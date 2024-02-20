import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  getClubsShort,
  removeAllClubs,
  // removeAllClubs,
  removeClub as removeClubAS,
  saveClub,
  updateClubDB,
} from '../lib/asyncstorage/clubs'

import { ClubComplete, ClubShort } from '../Model/Club'

interface ClubsProviderProps {
  children: ReactNode
}

type ClubsContextDataProps = {
  clubs: ClubShort[]
  addClub: (club: ClubComplete) => Promise<void>
  removeClub: (idClub: string) => Promise<void>
  updateClub: (idClub: string, newClub: ClubComplete) => Promise<void>
}

export const ClubsContext = createContext<ClubsContextDataProps>(
  {} as ClubsContextDataProps,
)

export function ClubsProvider({ children }: ClubsProviderProps) {
  const [clubs, setClubs] = useState<ClubShort[]>([])

  async function addClub(club: ClubComplete) {
    await saveClub(club)

    await loadClubs()
  }

  async function removeClub(idClub: string): Promise<void> {
    await removeClubAS(idClub)

    await loadClubs()
  }

  async function updateClub(
    idClub: string,
    newClub: ClubComplete,
  ): Promise<void> {
    await updateClubDB(idClub, newClub)

    await loadClubs()
  }

  const loadClubs = useCallback(async () => {
    // await removeAllClubs()
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
        addClub,
        removeClub,
        updateClub,
      }}
    >
      {children}
    </ClubsContext.Provider>
  )
}
