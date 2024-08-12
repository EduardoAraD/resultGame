import { useState } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { TextInput } from './styles'

type InputProps = TextInputProps & {
  invalid?: boolean
}

export function Input({ invalid = false, ...rest }: InputProps) {
  const {
    colors: { gray_300, blue_300, red, blue_200 },
  } = useTheme()
  const [focusInput, setFocusInput] = useState(false)

  function getBorderColorInput() {
    if (focusInput) {
      return blue_300
    }

    if (invalid) {
      return red
    }

    return blue_200
  }

  function handleFocus() {
    setFocusInput(true)
  }

  function handleBlur() {
    setFocusInput(false)
  }

  return (
    <TextInput
      testID="input"
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholderTextColor={gray_300}
      style={{ borderColor: getBorderColorInput() }}
      {...rest}
    />
  )
}
