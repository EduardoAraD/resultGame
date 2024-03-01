import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View } from 'react-native'

import { useCup } from '../../hook/useCup'

import { Background } from '../../components/Background'
import { Classification } from '../../components/Classification'
import { CupAwards } from './components/CupAwards'
import { InfoCup } from './components/InfoCup'
import { Loading } from '../../components/Loading'
import { Matchs } from './components/Matchs'
import { TableCup } from './components/TableCup'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'
import { ViewOption } from '../../components/ViewOption'

import { Container } from './styles'

export interface DetailsCupRouteParams {
  idCup: string
}
const OPTIONS = ['Detalhes', 'Tabela', 'Jogos', 'Prêmios']

export function DetailsCup() {
  const { idCup } = useRoute().params as DetailsCupRouteParams
  const { cup, loadInfoCupById } = useCup()

  const [option, setOption] = useState('Detalhes')
  const [loading, setLoading] = useState(false)

  const loadInfoCup = useCallback(async () => {
    try {
      setLoading(true)
      await loadInfoCupById(idCup)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [idCup, loadInfoCupById])

  useFocusEffect(
    useCallback(() => {
      loadInfoCup()
    }, [loadInfoCup]),
  )

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title={cup.name} />
        <View style={{ height: 30 }} />
        <ViewOption
          options={OPTIONS}
          optionSelected={option}
          onOptionSelected={setOption}
        >
          {loading ? (
            <Loading />
          ) : option === 'Detalhes' ? (
            <InfoCup />
          ) : option === 'Tabela' ? (
            cup.type === 'Cup' ? (
              <TableCup />
            ) : (
              <Classification />
            )
          ) : option === 'Jogos' ? (
            <Matchs />
          ) : (
            <CupAwards />
          )}
        </ViewOption>
      </Container>
    </Background>
  )
}
