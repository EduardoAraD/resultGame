import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/home';
import { GameCurrent } from '../screens/gameCurrent';
import { List } from '../screens/list';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='game' component={GameCurrent} />
    </Navigator>
  )
}