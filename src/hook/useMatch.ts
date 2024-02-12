import { useContext } from 'react'

import { MatchContext } from '../contexts/match'

export function useMatch() {
  const context = useContext(MatchContext)

  return context
}
