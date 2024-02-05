import { useNavigation } from '@react-navigation/native'

import { MatchRoutesNavigationProps } from '../../routes/routes/match.routes'

import { ModeMatch } from '../../Model/ModeMatch'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'

import { Container, Content, Title } from './styles'

export function HomeMatch() {
  const { navigate } = useNavigation<MatchRoutesNavigationProps>()

  function handleGoToChooseClub(mode: ModeMatch) {
    navigate('chooseClub', { mode })
  }

  return (
    <Background>
      <Container>
        <Title>Crie sua partida</Title>
        <Content>
          <Title style={{ marginBottom: 100 }}>Modo da Partida</Title>
          <Button
            title="Amistoso"
            onPress={() => handleGoToChooseClub('Normal')}
          />
          <Button
            style={{ marginTop: 30 }}
            title="Eliminatória"
            onPress={() => handleGoToChooseClub('Mata-Mata')}
          />
        </Content>
      </Container>
    </Background>
  )
}
