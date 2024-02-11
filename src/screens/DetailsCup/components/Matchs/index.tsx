import { FlatList, View } from 'react-native'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { CupRoutesNavigationProps } from '../../../../routes/routes/cup.routes'

import { MatchComplete } from '../../../../Model/Match'
import { CardMatch } from '../../../../components/CardMatch'

import { Actions, Container, Round, Touch } from './styles'

interface MatchsProps {
  onRound: (round: number) => void
  maxRound: number
  round: number
  matchs: MatchComplete[]
  nameCup: string
  idCup: string
}

export function Matchs({
  onRound,
  maxRound,
  round,
  matchs,
  nameCup,
  idCup,
}: MatchsProps) {
  const { navigate } = useNavigation<CupRoutesNavigationProps>()
  const {
    colors: { white, gray_400 },
  } = useTheme()

  function handleUpdateRound(value: number) {
    const newRound = round + value
    if (newRound >= 1 && newRound <= maxRound) {
      onRound(newRound)
    }
  }

  function handleGoStartMatch(match: MatchComplete) {
    navigate('startMatchCup', {
      match: {
        idMatch: match.id,
        awayId: match.away.id,
        homeId: match.home.id,
        mode: match.type,
      },
      cup: {
        id: idCup,
        name: nameCup,
        numberRound: round,
      },
    })
  }

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
        <Round>{round}° Rodada</Round>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMatch match={item} onPress={() => handleGoStartMatch(item)} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
      />
    </Container>
  )
}
