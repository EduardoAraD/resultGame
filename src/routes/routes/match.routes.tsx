import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { HomeMatch } from '../../screens/HomeMatch'
import {
  ChooseClubMatch,
  ChooseClubMatchRouteProps,
} from '../../screens/ChooseClubMatch'
import { Match, MatchRouteProps } from '../../screens/Match'

type MatchRoutesProps = {
  homeMatch: undefined
  chooseClub: ChooseClubMatchRouteProps
  match: MatchRouteProps
}

export type MatchRoutesNavigationProps =
  NativeStackNavigationProp<MatchRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<MatchRoutesProps>()

export function MatchRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeMatch" component={HomeMatch} />
      <Screen name="chooseClub" component={ChooseClubMatch} />
      <Screen name="match" component={Match} />
    </Navigator>
  )
}
