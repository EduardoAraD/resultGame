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
import {
  StartMatchCup,
  StartMatchCupRouteProps,
} from '../../screens/StartMatchCup'
import { Match, MatchRouteProps } from '../../screens/Match'
import { ResultMatch, ResultMatchRouteParams } from '../../screens/ResultMatch'

type CupRoutesProps = {
  homeCup: undefined
  createCup: undefined
  chooseClubs: ChooseClubsInCupRouteParams
  detailsCup: DetailsCupRouteParams
  startMatchCup: StartMatchCupRouteProps
  match: MatchRouteProps
  resultMatch: ResultMatchRouteParams
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
      <Screen name="startMatchCup" component={StartMatchCup} />
      <Screen name="match" component={Match} />
      <Screen name="resultMatch" component={ResultMatch} />
    </Navigator>
  )
}
