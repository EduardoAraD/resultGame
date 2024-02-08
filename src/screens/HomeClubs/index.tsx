import { useMemo, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ShieldPlus, ShieldSlash } from 'phosphor-react-native'

import { useClubs } from '../../hook/useClubs'
import { ClubRoutesNavigationProps } from '../../routes/routes/club.routes'

import { ClubShort } from '../../Model/Club'
import { Background } from '../../components/Background'
import { ButtonIconOver } from '../../components/ButtonIconOver'
import { CardClub } from '../../components/CardClub'
import { Input } from '../../components/Input'
import { TitleFlatlist } from '../../components/TitleFlatlist'

import { Actions, Container, Title, Touch } from './styles'
import { useTheme } from 'styled-components/native'

export function HomeClubs() {
  const {
    colors: { white },
  } = useTheme()
  const { clubs } = useClubs()
  const { navigate } = useNavigation<ClubRoutesNavigationProps>()

  const [search, setSearch] = useState('')
  const [showDisabledClubs, setShowDisabledClubs] = useState(false)

  function handleToDetailsClub(idClub: string) {
    navigate('detailsClub', { idClub })
  }

  function handleToCreateClub() {
    navigate('createClub', { club: undefined })
  }

  const listClubs: ClubShort[] = useMemo(() => {
    const searchLower = search.toLocaleLowerCase()
    return clubs
      .filter((i) => i.name.toLocaleLowerCase().includes(searchLower))
      .filter((i) => !i.disabled || showDisabledClubs)
      .sort((a, b) => {
        const nameA = a.name.toLocaleLowerCase()
        const nameB = b.name.toLocaleLowerCase()
        if (nameA > nameB) return 1
        else return -1
      })
  }, [clubs, search, showDisabledClubs])

  return (
    <Background>
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Title>Gerenciamento de clubes</Title>
          <Actions>
            <Input
              style={{ flex: 1 }}
              placeholder="Filtre os clubes"
              invalid={false}
              onChangeText={setSearch}
              value={search}
              editable
            />
            <Touch
              activeOpacity={0.7}
              selected={showDisabledClubs}
              onPress={() => setShowDisabledClubs(!showDisabledClubs)}
            >
              <ShieldSlash size={20} color={white} weight="bold" />
            </Touch>
          </Actions>

          <TitleFlatlist
            style={{ marginTop: 10 }}
            title="Lista de Clubes"
            quantity={listClubs.length}
          />
          <FlatList
            keyExtractor={(item) => item.id}
            data={listClubs}
            renderItem={({ item }) => (
              <CardClub
                club={item}
                onPress={() => handleToDetailsClub(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
          <ButtonIconOver icon={ShieldPlus} onPress={handleToCreateClub} />
        </KeyboardAvoidingView>
      </Container>
    </Background>
  )
}
