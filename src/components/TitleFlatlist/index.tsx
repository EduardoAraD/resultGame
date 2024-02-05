import { Container, Title } from './styles'

interface TitleFlatlistProps {
  title: string
  quantity: number | string
}

export function TitleFlatlist({ title, quantity }: TitleFlatlistProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Title>{quantity}</Title>
    </Container>
  )
}
