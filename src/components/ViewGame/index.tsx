import { useState } from 'react'
import { ImageSourcePropType } from 'react-native'

import { MomentComplete } from '../../Model/Moment'
import { Stats } from '../../Model/Stats'
import { MomentGame } from '../MomentGame'
import { MomentsGame } from '../MomentsGame'
import { StatsGame } from '../StatsGame'

import {
  Content,
  DivActionGame,
  OptionGame,
  Scroll,
  TextOptionGame,
} from './styles'

type OptionGameType = 'narration' | 'highlight' | 'stats'
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
  const [optionViewGame, setOptionViewGame] =
    useState<OptionGameType>('highlight')

  function handleUpdateOptionViewGame(value: OptionGameType) {
    setOptionViewGame(value)
  }

  return (
    <Content>
      <DivActionGame>
        <OptionGame
          selected={optionViewGame === 'narration'}
          activeOpacity={0.8}
          onPress={() => handleUpdateOptionViewGame('narration')}
        >
          <TextOptionGame selected={optionViewGame === 'narration'}>
            Narração
          </TextOptionGame>
        </OptionGame>
        <OptionGame
          selected={optionViewGame === 'highlight'}
          activeOpacity={0.8}
          onPress={() => handleUpdateOptionViewGame('highlight')}
        >
          <TextOptionGame selected={optionViewGame === 'highlight'}>
            Destaques
          </TextOptionGame>
        </OptionGame>
        <OptionGame
          selected={optionViewGame === 'stats'}
          activeOpacity={0.8}
          onPress={() => handleUpdateOptionViewGame('stats')}
        >
          <TextOptionGame selected={optionViewGame === 'stats'}>
            Estatísticas
          </TextOptionGame>
        </OptionGame>
      </DivActionGame>
      <Scroll showsVerticalScrollIndicator={false}>
        {optionViewGame === 'narration' &&
          listNarration.map((item) => (
            <MomentGame
              key={`${item.minute}-${item.id}`}
              min={item.minute}
              text={item.narracao}
              isPrimary={item.goal}
              logo={item.homeOrAway === 'home' ? logoHome : logoAway}
            />
          ))}
        {optionViewGame === 'highlight' && (
          <MomentsGame moments={listMomentsHighlight} />
        )}
        {optionViewGame === 'stats' && (
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
    </Content>
  )
}
