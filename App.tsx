import { useFonts } from 'expo-font';
import { Rajdhani_400Regular, Rajdhani_700Bold, Rajdhani_500Medium } from '@expo-google-fonts/rajdhani'

import { StatusBar, View } from 'react-native';
import { Loading } from './src/components/Loading';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme/theme';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Rajdhani_400Regular, Rajdhani_700Bold, Rajdhani_500Medium });

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='default' translucent />
        {fontsLoaded ? <Routes /> : <Loading />}
      </View>
    </ThemeProvider>
  );
}
