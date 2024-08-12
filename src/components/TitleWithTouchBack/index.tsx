import { useNavigation } from '@react-navigation/native'

import { Content, IconBack, Title, TouchBack } from './styles'
import caretLeft from '../../assets/icons/caret-left-bold.svg'

interface TitleWithTouchBackProps {
  title: string
}

export function TitleWithTouchBack({ title }: TitleWithTouchBackProps) {
  const { goBack } = useNavigation()

  return (
    <Content>
      <TouchBack activeOpacity={0.7} onPress={goBack}>
        <IconBack source={caretLeft} />
      </TouchBack>
      <Title>{title}</Title>
    </Content>
  )
}
