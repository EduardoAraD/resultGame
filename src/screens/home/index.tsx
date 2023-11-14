import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { ModalChooseClub } from "../../components/Modal";

import { Clube, emptyClub } from "../../Model/Clube";
import { ModeGame } from "../../Model/ModeGame";

import {
  ButtonClube,
  CardButton,
  CardButtonText,
  Container,
  ContainerModeGame,
  DivClubes,
  Game,
  Info,
  Logo,
  LogoClube,
  Name,
  NameClube,
  Safe,
  Staduim,
  SubTitle,
  Title,
  VS,
  ViewClube
} from "./styles";


export function Home() {
  const { navigate } = useNavigation();

  const [homeClub, setHomeClub] = useState<Clube>(emptyClub);
  const [awayClub, setAwayClub] = useState<Clube>(emptyClub);
  const [showModalChooseClubHome, setShowModalChooseClubHome] = useState(false)
  const [showModalChooseClubAway, setShowModalChooseClubAway] = useState(false)
  const [modeGame, setModeGame] = useState<ModeGame>('Normal')

  function goGameCurrent() {
    navigate('game', { home: homeClub, away: awayClub, modeGame })
  }

  function handleChooseModeGame(modeG: ModeGame) {
    setModeGame(modeG)
  }

  const stadium = homeClub.stadium || 'A definir'
  const disabledButton = homeClub.name === '' || awayClub.name === '';

  return (
    <Safe>
      <Container>
        <Title>Escolher Times</Title>

        <DivClubes>
          <ButtonClube
            activeOpacity={0.7}
            onPress={() => setShowModalChooseClubHome(true)}>
            <Title>Casa</Title>
            <LogoClube source={homeClub.logo} />
            <NameClube>{homeClub.name}</NameClube>
          </ButtonClube>
          <ButtonClube
            activeOpacity={0.7}
            onPress={() => setShowModalChooseClubAway(true)}>
            <Title>Fora</Title>
            <LogoClube source={awayClub.logo} />
            <NameClube>{awayClub.name}</NameClube>
          </ButtonClube>
        </DivClubes>
        <SubTitle>Modo de Partida</SubTitle>
        <ContainerModeGame>
          <CardButton
            onPress={() => handleChooseModeGame('Normal')}
            activeOpacity={0.7}
            selected={modeGame === 'Normal'}>
            <CardButtonText>Normal</CardButtonText>
          </CardButton>
          <CardButton
            onPress={() => handleChooseModeGame('Mata-Mata')}
            activeOpacity={0.7}
            selected={modeGame === 'Mata-Mata'}>
            <CardButtonText>Mata-Mata</CardButtonText>
          </CardButton>
          <CardButton
            onPress={() => handleChooseModeGame('Volta')}
            activeOpacity={0.7}
            selected={modeGame === 'Volta'}>
            <CardButtonText>Partida de Volta</CardButtonText>
          </CardButton>
        </ContainerModeGame>

        <Info>
          <Title>Jogo a seguir</Title>
          <Staduim>{stadium}</Staduim>
          <Game>
            <ViewClube position='flex-start'>
              <Name>{homeClub.name}</Name>
              <Logo source={homeClub.logo} />
            </ViewClube>
            <VS>vs</VS>
            <ViewClube position='flex-end'>
              <Logo source={awayClub.logo} />
              <Name>{awayClub.name}</Name>
            </ViewClube>
          </Game>
        </Info>

        <Button disabled={disabledButton} onPress={goGameCurrent} />
      </Container>
      <ModalChooseClub
        visible={showModalChooseClubHome}
        onClose={() => setShowModalChooseClubHome(false)}
        onSelectedClub={setHomeClub}
      />
      <ModalChooseClub
        visible={showModalChooseClubAway}
        onClose={() => setShowModalChooseClubAway(false)}
        onSelectedClub={setAwayClub}
      />
    </Safe>
  )
}
