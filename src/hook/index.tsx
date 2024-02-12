import { ReactNode } from 'react'

import { ClubsProvider } from '../contexts/clubs'
import { MatchProvider } from '../contexts/match'

interface HooksProviderProps {
  children: ReactNode
}

export function HooksProvider({ children }: HooksProviderProps) {
  return (
    <ClubsProvider>
      <MatchProvider>{children}</MatchProvider>
    </ClubsProvider>
  )
}
