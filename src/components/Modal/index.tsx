import { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import Animated, {
  SlideInDown,
  SlideInRight,
  SlideOutDown,
  SlideOutRight,
} from 'react-native-reanimated'

import { useClubs } from '../../hook/useClubs'

import { ClubShort } from '../../Model/Club'
import { CardClub } from '../CardClub'

import { CloseButton, Container, Input, Line, ModalView, Title } from './styles'

export type HomeOrAway = 'home' | 'away'

interface ModalChooseClubProps {
  visible: boolean
  onClose: () => void
  onSelectedClub: (club: ClubShort, homeOrAway: HomeOrAway) => void
  homeOrAway: HomeOrAway
  clubsBlocked?: ClubShort[]
}

export function ModalChooseClub({
  visible,
  onClose,
  onSelectedClub,
  homeOrAway,
  clubsBlocked = [],
}: ModalChooseClubProps) {
  const { clubs } = useClubs()
  const [search, setSearch] = useState('')

  function selectedCard(club: ClubShort) {
    onSelectedClub(club, homeOrAway)
    setSearch('')
    onClose()
  }

  const listClubs = useMemo(() => {
    const searchLow = search.toLowerCase()
    return clubs
      .filter(
        (club) =>
          !clubsBlocked.find((clubBlocked) => club.id === clubBlocked.id),
      )
      .filter((i) => !i.disabled)
      .filter((club) => club.name.toLocaleLowerCase().includes(searchLow))
  }, [clubs, clubsBlocked, search])

  return (
    visible && (
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Container>
          <ModalView>
            <CloseButton activeOpacity={0.7} onPress={onClose}>
              <Title>X</Title>
            </CloseButton>
            <Title>Escolha o clube</Title>
            <Input
              placeholder="Filtrar clube"
              value={search}
              onChangeText={setSearch}
              blurOnSubmit={false}
            />
            <FlatList
              data={listClubs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
                  <CardClub club={item} onPress={() => selectedCard(item)} />
                </Animated.View>
              )}
              contentContainerStyle={{
                padding: 10,
                paddingBottom: 40,
              }}
              ItemSeparatorComponent={() => <Line />}
            />
          </ModalView>
        </Container>
      </Animated.View>
    )
  )
}
