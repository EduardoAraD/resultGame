import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { SoccerBall, Trophy } from 'phosphor-react-native'

import theme from '../theme'

import { ClubRoutes } from './routes/club.routes'
import { MatchRoutes } from './routes/match.routes'

const Tab = createBottomTabNavigator()

export type TabRoutes = {
  clubsTab: undefined
  matchsTab: undefined
}

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.gray_300,
        tabBarStyle: {
          backgroundColor: theme.colors.blue_200,
        },
      }}
    >
      <Tab.Screen
        name="clubsTab"
        component={ClubRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shield" size={size} color={color} />
          ),
          tabBarLabel: 'Clubes',
        }}
      />
      {/* <Tab.Screen
        name="cupTab"
        component={CupTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
          tabBarLabel: 'Campeonato',
        }}
      /> */}
      <Tab.Screen
        name="matchsTab"
        component={MatchRoutes}
        options={{
          tabBarLabel: 'Partidas',
          tabBarIcon: ({ color, size }) => (
            <SoccerBall size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
