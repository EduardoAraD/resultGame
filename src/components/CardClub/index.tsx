import { TouchableOpacityProps } from 'react-native'
import Animated, {
  BounceIn,
  FlipOutEasyY,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated'

import { ClubShort } from '../../Model/Club'

import {
  Card,
  Circle,
  CircleSlow,
  Image,
  Name,
  TextCreated,
  TextDesabled,
  ViewCreated,
} from './styles'

interface CardClubProps extends TouchableOpacityProps {
  club: ClubShort
  showCheck?: boolean
  isSelected?: boolean
}

export function CardClub({
  club,
  showCheck,
  isSelected,
  ...rest
}: CardClubProps) {
  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <Card activeOpacity={0.7} isSelected={isSelected} {...rest}>
        {showCheck && (
          <Circle isSelected={isSelected}>
            {isSelected && (
              <Animated.View entering={BounceIn} exiting={FlipOutEasyY}>
                <CircleSlow />
              </Animated.View>
            )}
          </Circle>
        )}
        <Image source={club.logo} alt="" />
        <Name isSelected={isSelected} style={{ flex: 1 }}>
          {club.name}
        </Name>
        {club.createdForUser && (
          <ViewCreated>
            <TextCreated>C</TextCreated>
          </ViewCreated>
        )}
        {club.disabled && <TextDesabled>Desabilitado</TextDesabled>}
      </Card>
    </Animated.View>
  )
}
