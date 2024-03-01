import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'

import { useCup } from '../../../../hook/useCup'

import { PlacarTable } from './PlacarTable'

import { getNameRoundCup } from '../../../../utils/functions/getNameRoundCup'

import { Container, Content, Matchs, Title, Touch } from './styles'

export function TableCup() {
  const { rounds, cup } = useCup()
  const hasThirdPlace = cup.hasThirdPlace

  const [roundSelected, setRoundSelected] = useState(-1)

  function handleRoundSelected(roundNumber: number) {
    if (roundNumber !== roundSelected) {
      setRoundSelected(roundNumber)
    } else {
      setRoundSelected(-1)
    }
  }

  const listRound = useMemo(() => {
    let listRound = rounds.map((i) => i)
    listRound.reverse()

    if (roundSelected !== -1) {
      listRound = listRound.filter((i) => roundSelected >= i.numberRound)
    }

    return listRound
  }, [roundSelected, rounds])

  const numberRounds = useMemo(() => {
    return listRound.length
  }, [listRound.length])

  return (
    <ScrollView horizontal contentContainerStyle={{ padding: 10 }}>
      <ScrollView>
        <Container>
          {listRound.map((round, index) => (
            <Content key={round.numberRound}>
              <Touch
                activeOpacity={0.7}
                actived={roundSelected === round.numberRound}
                onPress={() => handleRoundSelected(round.numberRound)}
              >
                <Title>
                  {getNameRoundCup(index + 1, numberRounds, hasThirdPlace)}
                </Title>
              </Touch>

              <Matchs disableFlex={index === 0}>
                {round.matchs.map((match) => (
                  <PlacarTable key={match.stats.id} match={match} />
                ))}
              </Matchs>
            </Content>
          ))}
        </Container>
      </ScrollView>
    </ScrollView>
  )
}
