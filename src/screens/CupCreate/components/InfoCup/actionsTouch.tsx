import { useTheme } from 'styled-components/native'
import { Minus, Plus } from 'phosphor-react-native'

import {
  TouchMinus,
  TouchPlus,
  ValueText,
  ValueView,
  ViewActionsTouch,
} from './styles'

interface ActionsTouchProps {
  points: number
  onPoints: (points: number) => void
}

export function ActionsTouch({ points, onPoints }: ActionsTouchProps) {
  const {
    colors: { white },
  } = useTheme()

  function handleUpdatePoints(value: number) {
    const newPoints = points + value
    if (newPoints >= 0 && newPoints <= 99) {
      onPoints(newPoints)
    }
  }

  return (
    <ViewActionsTouch>
      <TouchMinus
        disabled={points <= 0}
        activeOpacity={0.7}
        onPress={() => handleUpdatePoints(-1)}
      >
        <Minus size={20} color={white} />
      </TouchMinus>
      <ValueView>
        <ValueText>{points}</ValueText>
      </ValueView>
      <TouchPlus
        disabled={points >= 99}
        activeOpacity={0.7}
        onPress={() => handleUpdatePoints(1)}
      >
        <Plus size={20} color={white} />
      </TouchPlus>
    </ViewActionsTouch>
  )
}
