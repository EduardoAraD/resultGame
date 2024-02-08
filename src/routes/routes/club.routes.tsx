import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { CreateClub, CreateClubRouteParams } from '../../screens/CreateClub'
import { HomeClubs } from '../../screens/HomeClubs'
import { DetailsClub, DetailsClubsRoutesProps } from '../../screens/DetailsClub'

type ClubRoutesProps = {
  homeClub: undefined
  detailsClub: DetailsClubsRoutesProps
  createClub: CreateClubRouteParams
}

export type ClubRoutesNavigationProps =
  NativeStackNavigationProp<ClubRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<ClubRoutesProps>()

export function ClubRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeClub" component={HomeClubs} />
      <Screen name="detailsClub" component={DetailsClub} />
      <Screen name="createClub" component={CreateClub} />
    </Navigator>
  )
}
