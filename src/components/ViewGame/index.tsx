import { useState } from 'react'
import { ImageSourcePropType } from 'react-native'

import { MomentComplete } from '../../Model/Moment'
import { Stats } from '../../Model/Stats'
import { MomentGame } from '../MomentGame'
import { MomentsGame } from '../MomentsGame'
import { StatsGame } from '../StatsGame'
import { ViewOption } from '../ViewOption'

import { Scroll } from './styles'

interface ViewGameProps {
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
  const [optionViewGame, setOptionViewGame] = useState('Destaques')

  const narrationOPTION = 'Narração'
  const highlightOPTION = 'Destaques'
  const statsOPTION = 'Estatísticas'
  const OPTIONS = [narrationOPTION, highlightOPTION, statsOPTION]

  return (
    <ViewOption
      onOptionSelected={setOptionViewGame}
      optionSelected={optionViewGame}
      options={OPTIONS}
    >
      <Scroll showsVerticalScrollIndicator={false}>
        {optionViewGame === narrationOPTION &&
          listNarration.map((item) => (
            <MomentGame
              key={`${item.minute}-${item.id}`}
              min={item.minute}
              text={item.narracao}
              isPrimary={item.goal}
              logo={item.homeOrAway === 'home' ? logoHome : logoAway}
            />
          ))}
        {optionViewGame === highlightOPTION && (
          <MomentsGame moments={listMomentsHighlight} />
        )}
        {optionViewGame === statsOPTION && (
          <StatsGame
            logoHome={logoHome}
            logoAway={logoAway}
            statsAway={statsAway}
            statsHome={statsHome}
            goalAway={goalAway}
            goalHome={goalHome}
            goalPenalAway={goalPenalAway}
            goalPenalHome={goalPenalHome}
            hasPenalt={hasPenalt}
          />
        )}
      </Scroll>
    </ViewOption>
  )
}
