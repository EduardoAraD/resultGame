import { useState } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { TextInput } from './styles'

type InputProps = TextInputProps & {
  invalid: boolean
}

export function Input({ ...rest }: InputProps) {
  const {
    colors: { gray_300 },
  } = useTheme()
  const [focusInput, setFocusInput] = useState(false)

  function handleFocus() {
    setFocusInput(true)
  }

  function handleBlur() {
    setFocusInput(false)
  }

  return (
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      focus={focusInput}
      placeholderTextColor={gray_300}
      {...rest}
    />
  )
}
