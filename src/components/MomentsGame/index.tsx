import Animated, {
  SlideInRight,
  FadeIn,
  SlideInLeft,
} from 'react-native-reanimated'

import { Moment, MomentComplete } from '../../Model/Moment'
import { IconBall } from '../IconBall'

import {
  Bold,
  Bool,
  Container,
  ContainerMoment,
  ContentIntervalo,
  Line,
  LineHor,
  Minute,
  MomentInfo,
  Text,
  TextGol,
  TextPlacar,
  ViewPlacar,
} from './styles'

interface MomentsGameProps {
  moments: MomentComplete[]
}

export function MomentsGame({ moments }: MomentsGameProps) {
  let homeGoalCurrentSUM = moments.filter(
    (item) => item.goal && item.homeOrAway === 'home' && !item.penalt,
  ).length
  let awayGoalCurrentSUM = moments.filter(
    (item) => item.goal && item.homeOrAway === 'away' && !item.penalt,
  ).length

  let homeGoalPenaltCurrentSUM = moments.filter(
    (item) => item.goal && item.homeOrAway === 'home' && item.penalt,
  ).length
  let awayGoalPenaltCurrentSUM = moments.filter(
    (item) => item.goal && item.homeOrAway === 'away' && item.penalt,
  ).length

  function renderMoment(moment: Moment) {
    if (moment.penalt) {
      const isHomePenalt = moment.homeOrAway === 'home'
      const isGoal = !!moment.goal

      const goalHomePenaltCurrent = homeGoalPenaltCurrentSUM
      homeGoalPenaltCurrentSUM -= isHomePenalt && isGoal ? 1 : 0

      const goalAwayPenaltCurrent = awayGoalPenaltCurrentSUM
      awayGoalPenaltCurrentSUM -= !isHomePenalt && isGoal ? 1 : 0

      return (
        <>
          <ContainerMoment>
            <MomentInfo style={{ alignItems: 'flex-end' }}>
              {isHomePenalt && (
                <Animated.View entering={SlideInLeft.delay(100)}>
                  <ViewPlacar>
                    <TextPlacar>
                      <Bold>{goalHomePenaltCurrent}</Bold> -{' '}
                      {goalAwayPenaltCurrent}
                    </TextPlacar>
                    <LineHor />
                  </ViewPlacar>
                  <TextGol>{moment.narracao}</TextGol>
                </Animated.View>
              )}
            </MomentInfo>
            <Bool>
              <IconBall checked={isGoal} />
            </Bool>
            <MomentInfo style={{ alignItems: 'flex-start' }}>
              {!isHomePenalt && (
                <Animated.View entering={SlideInRight.delay(100)}>
                  <ViewPlacar>
                    <LineHor />
                    <TextPlacar>
                      {goalHomePenaltCurrent} -{' '}
                      <Bold>{goalAwayPenaltCurrent}</Bold>
                    </TextPlacar>
                  </ViewPlacar>
                  <TextGol>{moment.narracao}</TextGol>
                </Animated.View>
              )}
            </MomentInfo>
          </ContainerMoment>
          <Line />
        </>
      )
    } else if (moment.goal) {
      const isGoalHome = moment.homeOrAway === 'home'
      const goalHomeCurrent = homeGoalCurrentSUM
      homeGoalCurrentSUM -= isGoalHome ? 1 : 0

      const goalAwayCurrent = awayGoalCurrentSUM
      awayGoalCurrentSUM -= isGoalHome ? 0 : 1

      return (
        <>
          <ContainerMoment>
            <MomentInfo style={{ alignItems: 'flex-end' }}>
              {isGoalHome && (
                <Animated.View entering={SlideInLeft.delay(100)}>
                  <ViewPlacar>
                    <TextPlacar>
                      <Bold>{goalHomeCurrent}</Bold> - {goalAwayCurrent}
                    </TextPlacar>
                    <LineHor />
                  </ViewPlacar>
                  <TextGol>GOOOOOLLL</TextGol>
                </Animated.View>
              )}
            </MomentInfo>
            <Bool>
              <Minute>{moment.minute}</Minute>
            </Bool>
            <MomentInfo style={{ alignItems: 'flex-start' }}>
              {!isGoalHome && (
                <Animated.View entering={SlideInRight.delay(100)}>
                  <ViewPlacar>
                    <LineHor />
                    <TextPlacar>
                      {goalHomeCurrent} - <Bold>{goalAwayCurrent}</Bold>
                    </TextPlacar>
                  </ViewPlacar>
                  <TextGol>GOOOOOLLL</TextGol>
                </Animated.View>
              )}
            </MomentInfo>
          </ContainerMoment>
          <Line />
        </>
      )
    } else if (moment.homeOrAway === 'game') {
      if (moment.minute === 1) {
        return (
          <>
            <Bool>
              <Minute>1</Minute>
            </Bool>
            <Text>Início de Jogo</Text>
          </>
        )
      } else if (moment.minute === 45) {
        return (
          <>
            <ContentIntervalo>
              <Text style={{ marginTop: 0 }}>Intervalo</Text>
            </ContentIntervalo>
            <Line />
          </>
        )
      } else {
        return (
          <>
            <Text>{moment.narracao}</Text>
            <Bool>
              <Minute>90</Minute>
            </Bool>
            <Line />
          </>
        )
      }
    }
  }

  return (
    <Container>
      {moments.map((item) => (
        <Animated.View key={`${item.minute}-${item.id}`} entering={FadeIn}>
          {renderMoment(item)}
        </Animated.View>
      ))}
    </Container>
  )
}
