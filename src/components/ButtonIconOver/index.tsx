import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Touch } from './styles'

interface ButtonIconOverProps extends TouchableOpacityProps {
  icon: React.FC<IconProps>
}

export function ButtonIconOver({
  icon: Icon,
  activeOpacity = 0.7,
  ...rest
}: ButtonIconOverProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Touch
      activeOpacity={activeOpacity}
      style={{
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      {...rest}
    >
      <Icon size={40} color={white} />
    </Touch>
  )
}
