import { useContext } from 'react'

import { CupContext } from '../contexts/cup'

export function useCup() {
  const context = useContext(CupContext)

  return context
}
