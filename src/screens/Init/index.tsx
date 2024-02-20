import { useNavigation } from '@react-navigation/native'

import { AppRoutesNavigationProps } from '../../routes/app.routes'

import { Background } from '../../components/Background'
import { Button } from '../../components/Button'

import { Container, Image } from './styles'
import LogoImg from '../../assets/logo.png'

export function Init() {
  const { navigate } = useNavigation<AppRoutesNavigationProps>()

  function handleGoHome() {
    navigate('home')
  }

  return (
    <Background>
      <Container>
        <Image source={LogoImg} alt="logo" />
        <Button
          style={{ marginTop: 60 }}
          title="Continuar"
          onPress={handleGoHome}
        />
      </Container>
    </Background>
  )
}
