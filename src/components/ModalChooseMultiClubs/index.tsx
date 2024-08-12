import { useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

import { useClubs } from '../../hook/useClubs'

import { ClubShort } from '../../Model/Club'
import { CardClub } from '../CardClub'
import { Button } from '../Button'
import { ModalBase } from '../ModalBase'

import { CloseButton, Input, Line, ModalView, Title } from './styles'

interface ModalChooseMultiClubProps {
  visible: boolean
  onClose: () => void
  onSelectedClub: (clubs: ClubShort[]) => void
  clubsBlocked?: ClubShort[]
}

interface ClubShortSelected extends ClubShort {
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
  const [clubsSelected, setClubsSelected] = useState<ClubShortSelected[]>([])

  function handleSelectedClub(idClub: string) {
    setClubsSelected((state) =>
      state.map((item) =>
        item.id === idClub ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  function handleSubmitClubs() {
    onSelectedClub(clubsSelected.filter((item) => item.selected))
    setSearch('')
    onClose()
  }

  useEffect(() => {
    const listClubsAvailable: ClubShortSelected[] = clubs
      .filter((i) => !i.isDisabled)
      .filter(
        (club) =>
          !clubsBlocked.find((clubBlocked) => club.id === clubBlocked.id),
      )
      .map((item) => ({
        ...item,
        selected: false,
      }))

    setClubsSelected(listClubsAvailable)
  }, [clubs, clubsBlocked])

  const listClubs = useMemo(() => {
    const searchLowerCase = search.toLowerCase()
    return clubsSelected.filter((club) =>
      club.name.toLocaleLowerCase().includes(searchLowerCase),
    )
  }, [clubsSelected, search])

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
