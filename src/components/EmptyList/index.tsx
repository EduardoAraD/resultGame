import { Text, View } from './styles'

interface EmptyListProps {
  message: string
}

export function EmptyList({ message }: EmptyListProps) {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  )
}
