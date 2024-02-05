import { Container, Text, Title } from './styles'

interface ItemStatsProps {
  valueHome: string
  valueAway: string
  title: string
}

export function ItemStats({ valueAway, valueHome, title }: ItemStatsProps) {
  return (
    <Container>
      <Text style={{ textAlign: 'left' }}>{valueHome}</Text>
      <Title>{title}</Title>
      <Text style={{ textAlign: 'right' }}>{valueAway}</Text>
    </Container>
  )
}
