import { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

import { useClubs } from '../../hook/useClubs'

import { ClubShort } from '../../Model/Club'
import { ModalBase } from '../ModalBase'
import { CardClub } from '../CardClub'

import { CloseButton, Input, Line, ModalView, Title } from './styles'

export type HomeOrAway = 'home' | 'away'

interface ModalChooseClubProps {
  visible: boolean
  onClose: () => void
  onSelectedClub: (club: ClubShort, homeOrAway: HomeOrAway) => void
  homeOrAway: HomeOrAway
  clubsBlocked?: ClubShort[]
}

export function ModalChooseOneClub({
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
    <ModalBase visible={visible} onClose={onClose}>
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
    </ModalBase>
  )
}
