import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated'

import { HomeOrAway } from '../../Model/HomeOrAway'

import {
  Bold,
  Bool,
  ContainerMoment,
  LineVertical,
  LineHorizontal,
  Minute,
  MomentInfo,
  TextGoal,
  TextScore,
  ViewScore,
} from './styles'

interface GetMomentGoalInProgressMatchProps {
  goalClubHome: number
  goalClubAway: number
  homeOrAway: HomeOrAway
  minute: number
}

export function MomentGoalInProgressMatch({
  goalClubAway,
  goalClubHome,
  minute,
  homeOrAway,
}: GetMomentGoalInProgressMatchProps) {
  const isHome = homeOrAway === 'home'

  return (
    <>
      <ContainerMoment>
        <MomentInfo style={{ alignItems: 'flex-end' }}>
          {isHome && (
            <Animated.View entering={SlideInLeft.delay(100)}>
              <ViewScore>
                <TextScore>
                  <Bold>{goalClubHome}</Bold> - {goalClubAway}
                </TextScore>
                <LineHorizontal />
              </ViewScore>
              <TextGoal>GOOOOOLLL</TextGoal>
            </Animated.View>
          )}
        </MomentInfo>
        <Bool>
          <Minute>{minute}</Minute>
        </Bool>
        <MomentInfo style={{ alignItems: 'flex-start' }}>
          {!isHome && (
            <Animated.View entering={SlideInRight.delay(100)}>
              <ViewScore>
                <LineHorizontal />
                <TextScore>
                  {goalClubHome} - <Bold>{goalClubAway}</Bold>
                </TextScore>
              </ViewScore>
              <TextGoal>GOOOOOLLL</TextGoal>
            </Animated.View>
          )}
        </MomentInfo>
      </ContainerMoment>
      <LineVertical />
    </>
  )
}
