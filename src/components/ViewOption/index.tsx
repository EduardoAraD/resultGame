import { ReactNode } from 'react'
import { View } from 'react-native'

import { Content, DivActionGame, OptionGame, TextOptionGame } from './styles'

interface ViewGameProps {
  optionSelected: string
  options: string[]
  onOptionSelected: (key: string) => void
  children: ReactNode
}

export function ViewOption({
  options,
  onOptionSelected,
  optionSelected,
  children,
}: ViewGameProps) {
  function handleUpdateOptionViewGame(value: string) {
    onOptionSelected(value)
  }

  return (
    <Content>
      <DivActionGame>
        {options.map((option) => (
          <OptionGame
            key={option}
            selected={option === optionSelected}
            activeOpacity={0.7}
            onPress={() => handleUpdateOptionViewGame(option)}
          >
            <TextOptionGame selected={option === optionSelected}>
              {option}
            </TextOptionGame>
          </OptionGame>
        ))}
      </DivActionGame>
      <View style={{ flex: 1 }}>{children}</View>
    </Content>
  )
}
