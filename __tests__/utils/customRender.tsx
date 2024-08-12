import { ReactElement, ReactNode } from 'react'
import { RenderOptions, render } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'

import { HooksProvider } from '../../src/hook'
import theme from '../../src/theme'

type ProviderProps = {
  children: ReactNode
}

function Providers({ children }: ProviderProps) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          {/* <HooksProvider>{children}</HooksProvider> */}
          {children}
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react-native'
export { customRender as render, Providers }
