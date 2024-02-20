import { useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

import { useClubs } from '../../hook/useClubs'

import { ClubShort } from '../../Model/Club'
import { ModalBase } from '../ModalBase'
import { CardClub } from '../CardClub'

import { CloseButton, Input, Line, ModalView, Title } from './styles'
import { Button } from '../Button'

export type HomeOrAway = 'home' | 'away'

interface ModalChooseMultiClubProps {
  visible: boolean
  onClose: () => void
  onSelectedClub: (clubs: ClubShort[]) => void
  clubsBlocked?: ClubShort[]
}

interface ClubShortWithSelected extends ClubShort {
  selected: boolean
}

export function ModalChooseMultiClubs({
  visible,
  onClose,
  onSelectedClub,
  clubsBlocked = [],
}: ModalChooseMultiClubProps) {
  const { clubs } = useClubs()
  const [search, setSearch] = useState('')
  const [clubsWithSelected, setClubsWithSelected] = useState<
    ClubShortWithSelected[]
  >([])

  function handleSelectedClub(idClub: string) {
    setClubsWithSelected((state) =>
      state.map((item) =>
        item.id === idClub ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  function handleSubmitClubs() {
    onSelectedClub(clubsWithSelected.filter((item) => item.selected))
    setSearch('')
    onClose()
  }

  useEffect(() => {
    const list: ClubShortWithSelected[] = clubs
      .filter((i) => !i.disabled)
      .filter(
        (club) =>
          !clubsBlocked.find((clubBlocked) => club.id === clubBlocked.id),
      )
      .map((item) => ({
        ...item,
        selected: false,
      }))

    setClubsWithSelected(list)
  }, [clubs, clubsBlocked])

  const listClubs = useMemo(() => {
    const searchLow = search.toLowerCase()
    return clubsWithSelected.filter((club) =>
      club.name.toLocaleLowerCase().includes(searchLow),
    )
  }, [clubsWithSelected, search])

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
              <CardClub
                club={item}
                isSelected={item.selected}
                showCheck
                onPress={() => handleSelectedClub(item.id)}
              />
            </Animated.View>
          )}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 40,
          }}
          ItemSeparatorComponent={() => <Line />}
        />
        <Button
          style={{ margin: 10, width: 'auto' }}
          title="Adicionar clubes"
          onPress={handleSubmitClubs}
        />
      </ModalView>
    </ModalBase>
  )
}
