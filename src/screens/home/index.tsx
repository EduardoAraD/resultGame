import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { HomeOrAway, ModalChooseClub } from "../../components/Modal";

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
  const [showModalChooseClub, setShowModalChooseClub] = useState(false);
  const [homeOrAway, setHomeOrAway] = useState<HomeOrAway|''>('');
  // const [showModalChooseClubAway, setShowModalChooseClubAway] = useState(false)
  const [modeGame, setModeGame] = useState<ModeGame>('Normal')

  function goGameCurrent() {
    navigate('game', { home: homeClub, away: awayClub, modeGame })
  }

  function handleChooseModeGame(modeG: ModeGame) {
    setModeGame(modeG)
  }

  function handleOpenModal(homeOrAway: HomeOrAway) {
    setHomeOrAway(homeOrAway);
    setShowModalChooseClub(true);
  }

  function handleCloseModal() {
    setShowModalChooseClub(false);
    setHomeOrAway('');
  }

  function handleUpdateClub(club: Clube, homeOrAway: HomeOrAway) {
    if(homeOrAway === 'home') {
      setHomeClub(club);
    } else {
      setAwayClub(club);
    }
  }

  const stadium = homeClub.stadium || 'A definir'
  const disabledButton = homeClub.name === '' || awayClub.name === '';

  return (
    <>
      <Safe>
        <Container>
          <Title>Escolher Times</Title>

          <DivClubes>
            <ButtonClube
              activeOpacity={0.7}
              onPress={() => handleOpenModal('home')}>
              <Title>Casa</Title>
              <LogoClube source={homeClub.logo} />
              <NameClube>{homeClub.name}</NameClube>
            </ButtonClube>
            <ButtonClube
              activeOpacity={0.7}
              onPress={() => handleOpenModal('away')}>
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

          <Button
            disabled={disabledButton}
            onPress={goGameCurrent}
            title="Continuar"
          />
        </Container>
      </Safe>
      {homeOrAway !== '' && showModalChooseClub && (
        <ModalChooseClub
          visible={showModalChooseClub}
          onClose={handleCloseModal}
          homeOrAway={homeOrAway}
          onSelectedClub={handleUpdateClub}
        />
      )}
    </>
  )
}
