import { ViewProps } from 'react-native'

import { Container, Title } from './styles'

interface TitleFlatlistProps extends ViewProps {
  title: string
  quantity: number | string
}

export function TitleFlatlist({
  title,
  quantity,
  ...rest
}: TitleFlatlistProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Title>{quantity}</Title>
    </Container>
  )
}
