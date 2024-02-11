import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { SoccerBall, Trophy } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { ClubRoutes } from './routes/club.routes'
import { MatchRoutes } from './routes/match.routes'
import { CupRoutes } from './routes/cup.routes'

const Tab = createBottomTabNavigator()

export type TabRoutes = {
  clubsTab: undefined
  matchsTab: undefined
}

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>

export function TabRoutes() {
  const { colors, fonts } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray_300,
        tabBarStyle: {
          backgroundColor: colors.blue_200,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bold,
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
      <Tab.Screen
        name="cupTab"
        component={CupRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
          tabBarLabel: 'Campeonatos',
        }}
      />
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
