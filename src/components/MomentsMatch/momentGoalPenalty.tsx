import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated'

import { HomeOrAway } from '../../Model/HomeOrAway'
import { IconBall } from '../IconBall'

import {
  Bold,
  Bool,
  ContainerMoment,
  LineVertical,
  LineHorizontal,
  MomentInfo,
  TextGoal,
  TextScore,
  ViewScore,
} from './styles'

interface MomentGoalPenaltyProps {
  narration: string
  goalClubHome: number
  goalClubAway: number
  homeOrAway: HomeOrAway
  isGoal: boolean
}

export function MomentGoalPenalty({
  narration,
  goalClubAway,
  goalClubHome,
  homeOrAway,
  isGoal,
}: MomentGoalPenaltyProps) {
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
              <TextGoal>{narration}</TextGoal>
            </Animated.View>
          )}
        </MomentInfo>
        <Bool>
          <IconBall checked={isGoal} />
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
              <TextGoal>{narration}</TextGoal>
            </Animated.View>
          )}
        </MomentInfo>
      </ContainerMoment>
      <LineVertical />
    </>
  )
}
