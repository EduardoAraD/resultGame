import Animated, { FadeIn } from 'react-native-reanimated'

import { Moment, MomentComplete } from '../../Model/Moment'
import { MomentGoalPenalty } from './momentGoalPenalty'
import { MomentGoalInProgressMatch } from './momentGoalInProgressMatch'

import {
  Bool,
  Container,
  ContentInterval,
  LineVertical,
  Minute,
  Text,
} from './styles'

interface MomentsGameProps {
  moments: MomentComplete[]
}
// function getGoalAndGoalPenaltyByMoments(moments: MomentComplete[]) {
//   const goals = moments
//     .filter((moment) => moment.stats.goal)
//     .map((moment) => moment.minute)
//   const goalsPenalty = moments.filter((moment) => moment.stats.goalPenalty)

//   return {
//     goals,
//     goalsPenalty,
//   }
// }

export function MomentsMatch({ moments }: MomentsGameProps) {
  let homeGoalCurrentSUM = moments.filter(
    (item) =>
      item.stats.goal && item.homeOrAway === 'home' && !item.isPenaltyShots,
  ).length
  let awayGoalCurrentSUM = moments.filter(
    (item) =>
      item.stats.goal && item.homeOrAway === 'away' && !item.isPenaltyShots,
  ).length

  let homeGoalPenaltCurrentSUM = moments.filter(
    (item) =>
      item.stats.goal && item.homeOrAway === 'home' && item.isPenaltyShots,
  ).length
  let awayGoalPenaltCurrentSUM = moments.filter(
    (item) =>
      item.stats.goal && item.homeOrAway === 'away' && item.isPenaltyShots,
  ).length

  function renderMoment(moment: Moment) {
    if (moment.isPenaltyShots) {
      const isHomePenalt = moment.homeOrAway === 'home'
      const isGoal = !!moment.stats.goal

      const goalHomePenaltCurrent = homeGoalPenaltCurrentSUM
      homeGoalPenaltCurrentSUM -= isHomePenalt && isGoal ? 1 : 0

      const goalAwayPenaltCurrent = awayGoalPenaltCurrentSUM
      awayGoalPenaltCurrentSUM -= !isHomePenalt && isGoal ? 1 : 0

      return (
        <MomentGoalPenalty
          narration={moment.narration}
          goalClubHome={goalHomePenaltCurrent}
          goalClubAway={goalAwayPenaltCurrent}
          homeOrAway={moment.homeOrAway}
          isGoal={!!moment.stats.goal}
        />
      )
    }

    const isGoalInMatchProgress = moment.stats.goal === 1
    if (isGoalInMatchProgress) {
      const isGoalHome = moment.homeOrAway === 'home'
      const goalHomeCurrent = homeGoalCurrentSUM
      homeGoalCurrentSUM -= isGoalHome ? 1 : 0

      const goalAwayCurrent = awayGoalCurrentSUM
      awayGoalCurrentSUM -= isGoalHome ? 0 : 1

      return (
        <MomentGoalInProgressMatch
          minute={moment.minute}
          goalClubAway={goalAwayCurrent}
          goalClubHome={goalHomeCurrent}
          homeOrAway={moment.homeOrAway}
        />
      )
    }

    const isMomentMatch = moment.homeOrAway === 'game'
    if (isMomentMatch) {
      const isMinute1 = moment.minute === 1
      if (isMinute1) {
        return (
          <>
            <Bool>
              <Minute>1</Minute>
            </Bool>
            <Text>Início de Jogo</Text>
          </>
        )
      }

      const isMinute45 = moment.minute === 45
      if (isMinute45) {
        return (
          <>
            <ContentInterval>
              <Text style={{ marginTop: 0 }}>Intervalo</Text>
            </ContentInterval>
            <LineVertical />
          </>
        )
      }

      return (
        <>
          <Text>{moment.narration}</Text>
          <Bool>
            <Minute>90</Minute>
          </Bool>
          <LineVertical />
        </>
      )
    }
  }

  return (
    <Container testID="list">
      {moments.map((item) => (
        <Animated.View key={`${item.minute}-${item.id}`} entering={FadeIn}>
          {renderMoment(item)}
        </Animated.View>
      ))}
    </Container>
  )
}
