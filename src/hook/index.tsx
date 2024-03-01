import { ReactNode } from 'react'

import { ClubsProvider } from '../contexts/clubs'
import { CupProvider } from '../contexts/cup'
import { MatchProvider } from '../contexts/match'

interface HooksProviderProps {
  children: ReactNode
}

export function HooksProvider({ children }: HooksProviderProps) {
  return (
    <ClubsProvider>
      <CupProvider>
        <MatchProvider>{children}</MatchProvider>
      </CupProvider>
    </ClubsProvider>
  )
}
