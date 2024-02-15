import { useEffect, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { FadeIn, FadeOut, SlideInUp, PinwheelIn } from 'react-native-reanimated'

import {
  Container,
  ContainerPenalts,
  Content,
  ContentAnimated,
  DivMatchTrip,
  ImageBack,
  ImageBall,
  Line,
  SubText,
  Text,
  TextAnimated,
} from './styles'
import ballPng from '../../assets/ball.png'

interface PlacarProps {
  goalHome: number
  goalAway: number
  logoHome: ImageSourcePropType
  logoAway: ImageSourcePropType
  hasPenalts: boolean
  penaltHome: number
  penaltAway: number
  placarMatchTrip?: {
    goalHome: number
    goalAway: number
  }
}

export function Placar({
  goalAway,
  goalHome,
  penaltAway,
  penaltHome,
  hasPenalts,
  logoAway,
  logoHome,
  placarMatchTrip = undefined,
}: PlacarProps) {
  const [isGoal, setIsGoal] = useState<'' | 'home' | 'away'>('')

  useEffect(() => {
    if (goalAway !== 0) {
      setIsGoal('away')
      const intervalAway = setInterval(() => {
        setIsGoal('')
      }, 2500)
      return () => clearInterval(intervalAway)
    }
  }, [goalAway])

  useEffect(() => {
    if (goalHome !== 0) {
      setIsGoal('home')
      const intervalHome = setInterval(() => {
        setIsGoal('')
      }, 2500)
      return () => clearInterval(intervalHome)
    }
  }, [goalHome])

  return isGoal !== '' ? (
    <Content>
      <ImageBack source={isGoal === 'home' ? logoHome : logoAway} />
      <ContentAnimated entering={PinwheelIn.duration(500)}>
        <TextAnimated entering={SlideInUp.duration(500).delay(150)}>
          G
        </TextAnimated>
        <ImageBall source={ballPng} alt="" />
        <TextAnimated entering={SlideInUp.duration(500).delay(150)}>
          O
        </TextAnimated>
        <TextAnimated entering={SlideInUp.duration(500).delay(300)}>
          O
        </TextAnimated>
        <TextAnimated entering={SlideInUp.duration(500).delay(450)}>
          O
        </TextAnimated>
        <TextAnimated entering={SlideInUp.duration(500).delay(600)}>
          L
        </TextAnimated>
      </ContentAnimated>
    </Content>
  ) : (
    <Container exiting={FadeOut} entering={FadeIn} hasPenalts={hasPenalts}>
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
      {placarMatchTrip !== undefined && (
        <DivMatchTrip>
          <SubText>{placarMatchTrip.goalHome}</SubText>
          <SubText>-</SubText>
          <SubText>{placarMatchTrip.goalAway}</SubText>
        </DivMatchTrip>
      )}
    </Container>
  )
}
