import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { HomeClubs } from '../../screens/HomeClubs'
import { DetailsClub, DetailsClubsRoutesProps } from '../../screens/DetailsClub'

type ClubRoutesProps = {
  homeClub: undefined
  detailsClub: DetailsClubsRoutesProps
}

export type ClubRoutesNavigationProps =
  NativeStackNavigationProp<ClubRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<ClubRoutesProps>()

export function ClubRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeClub" component={HomeClubs} />
      <Screen name="detailsClub" component={DetailsClub} />
    </Navigator>
  )
}
