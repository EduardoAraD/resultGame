import 'styled-components/native'
import theme from '../theme'

declare module 'styled-components/native' {
  type ThemeType = typeof theme

  // eslint-disable-next-line
  export interface DefaultTheme extends ThemeType {}
}
