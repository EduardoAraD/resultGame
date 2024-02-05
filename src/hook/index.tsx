import { ReactNode } from 'react'

import { ClubsProvider } from '../contexts/clubs'

interface HooksProviderProps {
  children: ReactNode
}

export function HooksProvider({ children }: HooksProviderProps) {
  return <ClubsProvider>{children}</ClubsProvider>
}
