import { ActiveStyle, Container } from './styles'

import theme from '../../theme'

interface ActiveColor {
  colorActive?: keyof typeof theme.colors
}

export function Loading({ colorActive = 'white' }: ActiveColor) {
  return (
    <Container>
      <ActiveStyle colorActive={colorActive} />
    </Container>
  )
}
