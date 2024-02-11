import { useCallback, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Trophy } from 'phosphor-react-native'

import { getListCup } from '../../lib/asyncstorage/cup'
import { CupRoutesNavigationProps } from '../../routes/routes/cup.routes'

import { CupShort } from '../../Model/Cup'
import { StatusCup } from '../../Model/Status'
import { Background } from '../../components/Background'
import { ButtonIconOver } from '../../components/ButtonIconOver'
import { CardCup } from '../../components/CardCup'
import { EmptyList } from '../../components/EmptyList'
import { Loading } from '../../components/Loading'
import { Option } from './components/Option'
import { TitleFlatlist } from '../../components/TitleFlatlist'

import { ActionFilter, Container, Title } from './styles'

export function HomeCup() {
  const { navigate } = useNavigation<CupRoutesNavigationProps>()

  const [optionFilter, setOptionFilter] = useState<StatusCup | ''>('')
  const [cups, setCups] = useState<CupShort[]>([])
  const [loading, setLoading] = useState(false)

  function handleOptionFilter(option: StatusCup) {
    if (option !== optionFilter) {
      setOptionFilter(option)
    } else {
      setOptionFilter('')
    }
  }

  function handleGoCreateCup() {
    navigate('createCup')
  }

  function handleGoDetailsCup(idCup: string) {
    navigate('detailsCup', { idCup })
  }

  const loadCups = useCallback(async () => {
    try {
      setLoading(true)
      const cupsAll = await getListCup()
      setCups(cupsAll)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadCups()
    }, [loadCups]),
  )

  const listCup = useMemo(() => {
    if (optionFilter !== '') {
      return cups.filter((cup) => cup.status === optionFilter)
    }
    return cups
  }, [cups, optionFilter])

  return (
    <Background>
      <Container>
        <Title>Campeonatos</Title>
        <TitleFlatlist title="Lista de campeonatos" quantity={listCup.length} />
        <ActionFilter>
          <Option
            text="Iniciar"
            boalColor="green"
            actived={optionFilter === 'start'}
            onPress={() => handleOptionFilter('start')}
          />
          <Option
            text="Andamento"
            boalColor="white"
            actived={optionFilter === 'progress'}
            onPress={() => handleOptionFilter('progress')}
          />
          <Option
            text="Encerrado"
            boalColor="cancel"
            actived={optionFilter === 'closed'}
            onPress={() => handleOptionFilter('closed')}
          />
        </ActionFilter>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={listCup}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardCup cup={item} onPress={() => handleGoDetailsCup(item.id)} />
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={() => <EmptyList text="Sem campeonatos" />}
          />
        )}

        <ButtonIconOver onPress={handleGoCreateCup} icon={Trophy} />
      </Container>
    </Background>
  )
}
