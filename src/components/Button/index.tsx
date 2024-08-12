import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Loading } from '../Loading'

import { ButtonTypeColor, Touch, TouchText } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  type?: ButtonTypeColor
  loading?: boolean
}

export function Button({
  title,
  type = 'Primary',
  disabled,
  loading,
  ...rest
}: ButtonProps) {
  const {
    colors: { gray_300, green, white, red },
  } = useTheme()

  function getBackgroundColorTouch() {
    if (disabled) {
      return gray_300
    }

    switch (type) {
      case 'Primary':
        return green
      case 'Secundary':
        return white
      case 'Cancel':
        return red
    }
  }

  return (
    <Touch
      testID="touch"
      activeOpacity={0.8}
      style={{ backgroundColor: getBackgroundColorTouch() }}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {loading ? (
        <Loading colorActive={type === 'Secundary' ? 'gray_700' : 'white'} />
      ) : (
        <TouchText type={type}>{title}</TouchText>
      )}
    </Touch>
  )
}
