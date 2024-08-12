import { TouchableOpacityProps } from 'react-native'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'

import { Circle, Touch } from './styles'

interface ButtonRadioProps extends TouchableOpacityProps {
  selected: boolean
}

export function ButtonRadio({ selected, ...rest }: ButtonRadioProps) {
  return (
    <Touch activeOpacity={0.7} {...rest}>
      {selected && (
        <Animated.View
          testID="selected"
          entering={BounceIn}
          exiting={BounceOut}
        >
          <Circle />
        </Animated.View>
      )}
    </Touch>
  )
}
