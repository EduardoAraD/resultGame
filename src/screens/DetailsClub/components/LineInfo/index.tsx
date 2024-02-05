import { Content, Text, Title } from './styles'

interface LineInfoProps {
  title: string
  text: string
}

export function LineInfo({ text, title }: LineInfoProps) {
  return (
    <Content>
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Content>
  )
}
