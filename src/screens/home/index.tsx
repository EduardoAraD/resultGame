import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";

import { Clube, emptyClub } from "../../Model/Clube";

import {
  ButtonClube,
  Container,
  DivClubes,
  Game,
  Info,
  Logo,
  LogoClube,
  Name,
  NameClube,
  Safe,
  Staduim,
  Title,
  VS,
  ViewClube
} from "./styles";
import { ModalChooseClub } from "../../components/Modal";

export function Home() {
  const { navigate } = useNavigation();

  const [homeClub, setHomeClub] = useState<Clube>(emptyClub);
  const [awayClub, setAwayClub] = useState<Clube>(emptyClub);
  const [showModalChooseClubHome, setShowModalChooseClubHome] = useState(false)
  const [showModalChooseClubAway, setShowModalChooseClubAway] = useState(false)

  function goGameCurrent() {
    navigate('game', { home: homeClub, away: awayClub })
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
