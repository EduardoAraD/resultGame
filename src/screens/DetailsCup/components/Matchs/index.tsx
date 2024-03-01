import { useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { CaretLeft, CaretRight } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import { useCup } from '../../../../hook/useCup'
import { useMatch } from '../../../../hook/useMatch'
import { CupRoutesNavigationProps } from '../../../../routes/routes/cup.routes'

import { MatchComplete } from '../../../../Model/Match'
import { CardMatch } from '../../../../components/CardMatch'

import { getNameRoundCup } from '../../../../utils/functions/getNameRoundCup'

import { Actions, Container, Round, Touch } from './styles'

export function Matchs() {
  const { navigate } = useNavigation<CupRoutesNavigationProps>()
  const {
    colors: { white, gray_400 },
  } = useTheme()
  const { saveMatch } = useMatch()
  const { cup, rounds, roundCurrent } = useCup()
  const maxRound = rounds.length

  const [roundSelected, setRoundSelected] = useState(roundCurrent)

  function handleUpdateRound(value: number) {
    const newRound = roundSelected + value
    if (newRound >= 1 && newRound <= maxRound) {
      setRoundSelected(newRound)
    }
  }

  async function handleGoStartMatch(match: MatchComplete) {
    saveMatch(match, {
      name: roundText,
      numberRound: roundSelected,
      maxRound,
    })

    navigate('matchCup')
  }

  const roundText = useMemo(() => {
    if (cup.type === 'Cup') {
      return getNameRoundCup(roundSelected, maxRound, cup.hasThirdPlace)
    }
    return `${roundSelected}° Rodada`
  }, [cup.hasThirdPlace, cup.type, maxRound, roundSelected])

  const matchsInRound = useMemo(() => {
    const roundSelec =
      cup.type === 'Cup' ? rounds.length - roundSelected + 1 : roundSelected
    const roundFind = rounds.find((round) => round.numberRound === roundSelec)
    if (roundFind) {
      return roundFind.matchs
    } else {
      return []
    }
  }, [cup.type, roundSelected, rounds])

  return (
    <Container>
      <Actions>
        <Touch
          activeOpacity={0.7}
          disabled={roundSelected <= 1}
          onPress={() => handleUpdateRound(-1)}
        >
          <CaretLeft
            size={20}
            color={roundSelected <= 1 ? gray_400 : white}
            weight="bold"
          />
        </Touch>
        <Round>{roundText}</Round>
        <Touch
          activeOpacity={0.7}
          disabled={roundSelected >= maxRound}
          onPress={() => handleUpdateRound(1)}
        >
          <CaretRight
            size={20}
            color={roundSelected >= maxRound ? gray_400 : white}
            weight="bold"
          />
        </Touch>
      </Actions>

      <FlatList
        data={matchsInRound}
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
