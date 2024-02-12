import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { HomeCup } from '../../screens/HomeCup'
import { CupCreate } from '../../screens/CupCreate'
import {
  ChooseClubsInCup,
  ChooseClubsInCupRouteParams,
} from '../../screens/ChooseClubsInCup'
import { DetailsCup, DetailsCupRouteParams } from '../../screens/DetailsCup'
import { MatchResultCup } from '../../screens/MatchResultCup'
import { Match, MatchRouteProps } from '../../screens/Match'

type CupRoutesProps = {
  homeCup: undefined
  createCup: undefined
  chooseClubs: ChooseClubsInCupRouteParams
  detailsCup: DetailsCupRouteParams
  matchCup: undefined
  match: MatchRouteProps
}

export type CupRoutesNavigationProps = NativeStackNavigationProp<CupRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<CupRoutesProps>()

export function CupRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeCup" component={HomeCup} />
      <Screen name="createCup" component={CupCreate} />
      <Screen name="chooseClubs" component={ChooseClubsInCup} />
      <Screen name="detailsCup" component={DetailsCup} />
      <Screen name="matchCup" component={MatchResultCup} />
      <Screen name="match" component={Match} />
    </Navigator>
  )
}
