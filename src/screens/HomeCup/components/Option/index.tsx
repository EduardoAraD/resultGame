import { TouchableOpacityProps } from 'react-native'

import { Boal, Text, Touch, TypeColor } from './styles'

interface OptionProps extends TouchableOpacityProps {
  text: string
  actived: boolean
  boalColor: TypeColor
}

export function Option({ text, boalColor, ...rest }: OptionProps) {
  return (
    <Touch activeOpacity={0.7} {...rest}>
      <Boal type={boalColor} />
      <Text>{text}</Text>
    </Touch>
  )
}
