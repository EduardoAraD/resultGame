import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { Init } from '../screens/Init'
import { TabRoutes } from './tab.routes'

const { Navigator, Screen } = createNativeStackNavigator()

type AppRoutesProps = {
  init: undefined
  home: undefined
}

export type AppRoutesNavigationProps = NativeStackNavigationProp<AppRoutesProps>

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="init" component={Init} />
      <Screen name="home" component={TabRoutes} />
    </Navigator>
  )
}
