import { useEffect, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useCup } from '../../hook/useCup'

import { GoalAnimated } from './animatedGoal'

import {
  Container,
  Content,
  ContentMatchTrip,
  ContentNameCup,
  ContentPlacar,
  Goal,
  Image,
  Line,
  Name,
  Text,
  TextName,
  TextPlacarTrip,
  ViewName,
} from './styles'

interface PlacarProps {
  home: {
    name: string
    logo: ImageSourcePropType
  }
  away: {
    name: string
    logo: ImageSourcePropType
  }
  goalHome: number
  goalAway: number
  hasPenalts: boolean
  penaltHome: number
  penaltAway: number
  placarMatchTrip?: {
    goalHome: number
    goalAway: number
  }
  nameCup: string
}

export function Placar({
  nameCup,
  goalAway,
  goalHome,
  penaltAway,
  penaltHome,
  hasPenalts,
  placarMatchTrip = undefined,
  home,
  away,
}: PlacarProps) {
  const { cup } = useCup()
  const [isGoalHome, setIsGoalHome] = useState(false)
  const [isGoalAway, setIsGoalAway] = useState(false)

  const sharedProgress = useSharedValue(0)

  const styledAnimated = useAnimatedStyle(() => {
    return {
      height: sharedProgress.value,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(hasPenalts ? 42 : 0)
  }, [hasPenalts, sharedProgress])

  useEffect(() => {
    if (goalAway !== 0) {
      setIsGoalAway(true)
      const intervalAway = setInterval(() => {
        setIsGoalAway(false)
      }, 2500)
      return () => clearInterval(intervalAway)
    }
  }, [goalAway])

  useEffect(() => {
    if (goalHome !== 0) {
      setIsGoalHome(true)
      const intervalHome = setInterval(() => {
        setIsGoalHome(false)
      }, 2500)
      return () => clearInterval(intervalHome)
    }
  }, [goalHome])

  return (
    <Container>
      <ContentNameCup>
        <Name>{nameCup === '' ? cup.name : nameCup}</Name>
        {placarMatchTrip && (
          <TextName>
            Placar de ida -{' '}
            <Text>
              {` ${placarMatchTrip.goalHome}-${placarMatchTrip.goalAway} `}{' '}
            </Text>
          </TextName>
        )}
      </ContentNameCup>

      <Content>
        <ViewName>
          <Image source={home.logo} alt="" style={{ left: 0 }} />
          {isGoalHome ? (
            <GoalAnimated />
          ) : (
            <Name exiting={FadeOut} entering={FadeIn} numberOfLines={2}>
              {home.name}
            </Name>
          )}
        </ViewName>
        <ContentPlacar>
          <Goal style={{ textAlign: 'right' }}>{goalHome}</Goal>
          <Line />
          <Goal style={{ textAlign: 'left' }}>{goalAway}</Goal>
        </ContentPlacar>
        <ViewName>
          <Image source={away.logo} alt="" style={{ right: 0 }} />
          {isGoalAway ? (
            <GoalAnimated />
          ) : (
            <Name exiting={FadeOut} entering={FadeIn} numberOfLines={2}>
              {away.name}
            </Name>
          )}
        </ViewName>
      </Content>
      <ContentMatchTrip style={styledAnimated}>
        <TextPlacarTrip style={{ textAlign: 'right' }}>
          {penaltHome}
        </TextPlacarTrip>
        <Line style={{ backgroundColor: 'white' }} />
        <TextPlacarTrip style={{ textAlign: 'left' }}>
          {penaltAway}
        </TextPlacarTrip>
      </ContentMatchTrip>
    </Container>
  )
}
