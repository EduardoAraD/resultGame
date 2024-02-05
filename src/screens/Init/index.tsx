import { useNavigation } from '@react-navigation/native'

import { AppRoutesNavigationProps } from '../../routes/app.routes'

import { Background } from '../../components/Background'
import { Button } from '../../components/Button'

import { Container, Image, Title } from './styles'
import LogoImg from '../../assets/logos/botaagua.png'

export function Init() {
  const { navigate } = useNavigation<AppRoutesNavigationProps>()

  function handleGoHome() {
    navigate('home')
  }

  return (
    <Background>
      <Container>
        <Image source={LogoImg} alt="logo" />
        <Title>MakerCup</Title>
        <Button title="Continuar" onPress={handleGoHome} />
      </Container>
    </Background>
  )
}
