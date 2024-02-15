import { useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { useMatch } from '../../../../hook/useMatch'
import { CupRoutesNavigationProps } from '../../../../routes/routes/cup.routes'

import { TypeCup } from '../../../../Model/Cup'
import { MatchComplete } from '../../../../Model/Match'
import { CardMatch } from '../../../../components/CardMatch'

import { getNameRoundCup } from '../../../../utils/functions/getNameRoundCup'

import { Actions, Container, Round, Touch } from './styles'

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

  const roundText = useMemo(() => {
    if (typeCup === 'Cup') {
      return getNameRoundCup(round, maxRound, hasThirdPlace)
    }
    return `${round}° Rodada`
  }, [hasThirdPlace, maxRound, round, typeCup])

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
