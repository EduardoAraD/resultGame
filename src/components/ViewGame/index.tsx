import { useState } from 'react'
import { ImageSourcePropType } from 'react-native'

import { useCup } from '../../hook/useCup'

import { MomentComplete } from '../../Model/Moment'
import { Stats } from '../../Model/Stats'
import { Classification } from '../Classification'
import { ViewOption } from '../ViewOption'

import { Scroll } from './styles'
import { MomentMatch } from '../MomentMatch'
import { MomentsMatch } from '../MomentsMatch'
import { StatsMatch } from '../StatsMatch'

interface ViewGameProps {
  idsClubsInMatch: string[]
  isMatchInCup: boolean
  listNarration: MomentComplete[]
  listMomentsHighlight: MomentComplete[]
  logoHome: ImageSourcePropType
  logoAway: ImageSourcePropType
  goalHome: number
  goalAway: number
  statsHome: Stats
  statsAway: Stats
  hasPenalt: boolean
  goalPenalHome: number
  goalPenalAway: number
}

export function ViewGame({
  idsClubsInMatch,
  isMatchInCup,
  listNarration,
  listMomentsHighlight,
  logoAway,
  logoHome,
  goalAway,
  goalHome,
  statsHome,
  statsAway,
  hasPenalt,
  goalPenalAway,
  goalPenalHome,
}: ViewGameProps) {
  const {
    cup: { type },
  } = useCup()

  const [optionViewGame, setOptionViewGame] = useState('Destaques')

  const narrationOPTION = 'Narração'
  const highlightOPTION = 'Destaques'
  const statsOPTION = 'Estatísticas'
  const classificationOPTION = 'Tabela'
  const OPTIONS = [narrationOPTION, highlightOPTION, statsOPTION]

  const isAddClassificationOption = isMatchInCup && type === 'league'
  if (isAddClassificationOption) {
    OPTIONS.push(classificationOPTION)
  }

  return (
    <ViewOption
      onOptionSelected={setOptionViewGame}
      optionSelected={optionViewGame}
      options={OPTIONS}
    >
      <Scroll showsVerticalScrollIndicator={false}>
        {optionViewGame === narrationOPTION &&
          listNarration.map((item) => (
            <MomentMatch
              key={`${item.minute}-${item.id}`}
              minute={item.minute}
              narration={item.narration}
              isGoal={item.stats.goal === 1}
              logo={item.homeOrAway === 'home' ? logoHome : logoAway}
            />
          ))}
        {optionViewGame === highlightOPTION && (
          <MomentsMatch moments={listMomentsHighlight} />
        )}
        {optionViewGame === statsOPTION && (
          <StatsMatch
            homeInfo={{
              logo: logoHome,
              stats: {
                ...statsHome,
                goal: goalHome,
                goalPenalty: goalPenalHome,
              },
            }}
            awayInfo={{
              logo: logoAway,
              stats: {
                ...statsAway,
                goal: goalAway,
                goalPenalty: goalPenalAway,
              },
            }}
            hasPenalt={hasPenalt}
          />
        )}
        {isMatchInCup && optionViewGame === classificationOPTION && (
          <Classification
            idsClubInMatchLive={idsClubsInMatch}
            hasMatchStatsProgressInClassification
          />
        )}
      </Scroll>
    </ViewOption>
  )
}
