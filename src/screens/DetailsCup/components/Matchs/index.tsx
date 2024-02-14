import { FlatList, View } from 'react-native'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { useMatch } from '../../../../hook/useMatch'
import { CupRoutesNavigationProps } from '../../../../routes/routes/cup.routes'

import {
  MatchComplete,
  MatchStats,
  emptyMatchStats,
} from '../../../../Model/Match'
import { CardMatch } from '../../../../components/CardMatch'

import { Actions, Container, Round, Touch } from './styles'
import { useCallback, useMemo } from 'react'
import { TypeCup } from '../../../../Model/Cup'
import {
  getRoundsCup,
  saveRoundsInCup,
} from '../../../../lib/asyncstorage/matchs'

interface MatchsProps {
  onRound: (round: number) => void
  maxRound: number
  round: number
  matchs: MatchComplete[]
  nameCup: string
  typeCup: TypeCup
  hasThirdPlace: boolean
  idCup: string
}

export function Matchs({
  onRound,
  maxRound,
  round,
  matchs,
  nameCup,
  typeCup,
  hasThirdPlace,
  idCup,
}: MatchsProps) {
  const { navigate } = useNavigation<CupRoutesNavigationProps>()
  const {
    colors: { white, gray_400 },
  } = useTheme()
  const { saveMatch } = useMatch()

  function handleUpdateRound(value: number) {
    const newRound = round + value
    if (newRound >= 1 && newRound <= maxRound) {
      onRound(newRound)
    }
  }

  async function handleGoStartMatch(match: MatchComplete) {
    saveMatch(
      match,
      {
        id: idCup,
        typeCup,
        name: nameCup,
      },
      {
        name: roundText,
        numberRound: round,
        maxRound,
      },
    )

    navigate('matchCup')
  }

  const getRoundCupText = useCallback(() => {
    switch (round) {
      case maxRound:
        return 'Final'
      case maxRound - 1:
        return hasThirdPlace ? 'Terceiro Lugar' : 'Semi-Final'
      case maxRound - 2:
        return hasThirdPlace ? 'Semi-Final' : 'Quartas de Final'
      case maxRound - 3:
        return hasThirdPlace ? 'Quartas de Final' : 'Oitavas de Final'
      case maxRound - 4:
        return hasThirdPlace
          ? 'Oitavas de Final'
          : `Eliminatória ${maxRound - round + 1}`
      default:
        return `Eliminatória ${maxRound - round + 1}`
    }
  }, [hasThirdPlace, maxRound, round])

  const roundText = useMemo(() => {
    if (typeCup === 'Cup') {
      return getRoundCupText()
    }
    return `${round}° Rodada`
  }, [getRoundCupText, round, typeCup])

  return (
    <Container>
      <Actions>
        <Touch
          activeOpacity={0.7}
          disabled={round <= 1}
          onPress={() => handleUpdateRound(-1)}
        >
          <CaretLeft
            size={20}
            color={round <= 1 ? gray_400 : white}
            weight="bold"
          />
        </Touch>
        <Round>{roundText}</Round>
        <Touch
          activeOpacity={0.7}
          disabled={round >= maxRound}
          onPress={() => handleUpdateRound(1)}
        >
          <CaretRight
            size={20}
            color={round >= maxRound ? gray_400 : white}
            weight="bold"
          />
        </Touch>
      </Actions>

      <FlatList
        data={matchs}
        keyExtractor={(item) => item.stats.id}
        renderItem={({ item }) => (
          <CardMatch match={item} onPress={() => handleGoStartMatch(item)} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
      />
    </Container>
  )
}
