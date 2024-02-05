import { useContext } from 'react'

import { ClubsContext } from '../contexts/clubs'

export function useClubs() {
  const context = useContext(ClubsContext)

  return context
}
