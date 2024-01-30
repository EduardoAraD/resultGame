import { useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";
import LottieView from 'lottie-react-native';

import goalAnimated from '../../assets/goal.json';
import {
  Container,
  ContainerPenalts,
  ContentAnimated,
  ImageBack,
  Line,
  SubText,
  Text
} from "./styles";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface PlacarProps {
  goalHome: number;
  goalAway: number;
  logoHome: ImageSourcePropType;
  logoAway: ImageSourcePropType;
  hasPenalts: boolean;
  penaltHome: number;
  penaltAway: number;
}

export function Placar({
  goalAway,
  goalHome,
  penaltAway,
  penaltHome,
  hasPenalts,
  logoAway,
  logoHome,
}: PlacarProps) {
  const [isGoal, setIsGoal] = useState<''|'home'|'away'>('');

  useEffect(() => {
    if(goalAway !== 0) {
      setIsGoal('away')
      const intervalAway = setInterval(() => {
        setIsGoal('');
      }, 2500);
      return () => clearInterval(intervalAway);
    }
  }, [goalAway]);

  useEffect(() => {
    if(goalHome !== 0) {
      setIsGoal('home');
      const intervalHome = setInterval(() => {
        setIsGoal('');
      }, 2500);
      return () => clearInterval(intervalHome);
    }
  }, [goalHome]);

  return isGoal !== '' ? (
    <ContentAnimated>
      <ImageBack source={isGoal === 'home' ? logoHome : logoAway} />
      <LottieView
        autoPlay
        loop
        style={{
          height: 90,
          marginBottom: -15,
        }}
        source={goalAnimated}
      />
    </ContentAnimated>
  ) : (
    <Container
      exiting={FadeOut}
      entering={FadeIn}
      hasPenalts={hasPenalts}>
      <Text style={{ textAlign: 'right' }}>{goalHome}</Text>
      {hasPenalts && (
        <SubText style={{ textAlign: 'right' }}>{penaltHome}</SubText>
      )}
      {hasPenalts ? (
        <ContainerPenalts>
          <SubText>P</SubText>
          <Line />
        </ContainerPenalts>
      ) : (
        <Line />
      )}
      {hasPenalts && (
        <SubText style={{ textAlign: 'left' }}>{penaltAway}</SubText>
      )}
      <Text style={{ textAlign: 'left' }}>{goalAway}</Text>
    </Container>
  )
}
