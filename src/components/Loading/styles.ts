import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

interface ActiveStyleProps {
  colorActive: keyof typeof theme.colors
}

export const ActiveStyle = styled.ActivityIndicator.attrs<ActiveStyleProps>(
  ({ theme, colorActive }) => ({
    color: theme.colors[colorActive],
    size: 32,
  }),
)``
