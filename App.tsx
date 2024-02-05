import { useFonts } from 'expo-font'
import {
  Rajdhani_400Regular,
  Rajdhani_700Bold,
  Rajdhani_500Medium,
} from '@expo-google-fonts/rajdhani'
import { StatusBar, View } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import { Routes } from './src/routes'
import { HooksProvider } from './src/hook'

import theme from './src/theme'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_700Bold,
    Rajdhani_500Medium,
  })

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, backgroundColor: theme.colors.blue_100 }}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor={theme.colors.blue_100}
        />
        <HooksProvider>{fontsLoaded ? <Routes /> : <Loading />}</HooksProvider>
      </View>
    </ThemeProvider>
  )
}
