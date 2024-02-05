import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useClubs } from '../../hook/useClubs'
import { ClubRoutesNavigationProps } from '../../routes/routes/club.routes'

import { Background } from '../../components/Background'
import { CardClub } from '../../components/CardClub'
import { TitleFlatlist } from '../../components/TitleFlatlist'

import { Container, Title } from './styles'

export function HomeClubs() {
  const { clubs } = useClubs()
  const { navigate } = useNavigation<ClubRoutesNavigationProps>()

  function handleToDetailsClub(idClub: string) {
    navigate('detailsClub', { idClub })
  }

  return (
    <Background>
      <Container>
        <Title>Gerenciamento de clubes</Title>
        <TitleFlatlist title="Lista de Clubes" quantity={clubs.length} />
        <FlatList
          keyExtractor={(item) => item.id}
          data={clubs}
          renderItem={({ item }) => (
            <CardClub
              club={item}
              onPress={() => handleToDetailsClub(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </Container>
    </Background>
  )
}
