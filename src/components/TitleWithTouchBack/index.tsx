import { useNavigation } from '@react-navigation/native'

import { Content, IconBack, Title, TouchBack } from './styles'

interface TitleWithTouchBackProps {
  title: string
}

export function TitleWithTouchBack({ title }: TitleWithTouchBackProps) {
  const { goBack } = useNavigation()

  return (
    <Content>
      <TouchBack activeOpacity={0.7} onPress={goBack}>
        <IconBack />
      </TouchBack>
      <Title>{title}</Title>
    </Content>
  )
}
