import { Text, View } from './styles'

interface EmptyListProps {
  text: string
}

export function EmptyList({ text }: EmptyListProps) {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}
