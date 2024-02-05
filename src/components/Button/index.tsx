import { TouchableOpacityProps } from 'react-native'

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
  loading,
  ...rest
}: ButtonProps) {
  return (
    <Touch activeOpacity={0.8} type={type} {...rest}>
      {loading ? <Loading /> : <TouchText type={type}>{title}</TouchText>}
    </Touch>
  )
}
