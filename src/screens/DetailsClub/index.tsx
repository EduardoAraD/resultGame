import { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import { ClubRoutesNavigationProps } from '../../routes/routes/club.routes'
import { useClubs } from '../../hook/useClubs'
import { getClubComplete } from '../../lib/asyncstorage/clubs'

import { ClubComplete, emptyClubComplete } from '../../Model/Club'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { LineInfo } from './components/LineInfo'
import { Loading } from '../../components/Loading'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  Actions,
  Container,
  Content,
  Image,
  Info,
  Overrall,
  TextOver,
  Title,
  ViewImage,
  ViewOver,
} from './styles'

export interface DetailsClubsRoutesProps {
  idClub: string
}

export function DetailsClub() {
  const { idClub } = useRoute().params as DetailsClubsRoutesProps
  const { removeClub } = useClubs()
  const { navigate, goBack } = useNavigation<ClubRoutesNavigationProps>()

  const [club, setClub] = useState<ClubComplete>(emptyClubComplete)
  const [loading, setLoading] = useState(true)
  const [loadingRemove, setLoadingRemove] = useState(false)

  async function handleRemoveClub() {
    try {
      setLoadingRemove(true)
      await removeClub(idClub)

      goBack()
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingRemove(false)
    }
  }

  function handleEditClub() {
    navigate('createClub', { club })
  }

  const loadClub = useCallback(async () => {
    try {
      setLoading(true)
      const clubDB = await getClubComplete(idClub)
      if (clubDB) {
        setClub(clubDB)
      }
    } catch (err) {
      console.log('ERROR', err)
    } finally {
      setLoading(false)
    }
  }, [idClub])

  useFocusEffect(
    useCallback(() => {
      loadClub()
    }, [loadClub]),
  )

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title={club.name} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <ViewImage>
              <Image source={club.logo} alt="" />
            </ViewImage>
            <Info>
              <Title>Informações do Clube</Title>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <LineInfo title="Nome completo" text={club.nameComplete} />
                  <LineInfo title="Sigla" text={club.sigla} />
                  <LineInfo title="Estádio" text={club.stadium} />
                </>
              )}
            </Info>
            <Overrall>Overrall</Overrall>
            <ViewOver>
              <TextOver>{club.overall}</TextOver>
            </ViewOver>
            <Actions>
              <Button
                title={club.disabled ? 'Habilitar' : 'Desabilitar'}
                onPress={handleRemoveClub}
                style={{ flex: 1 }}
                loading={loadingRemove}
                type={club.disabled ? 'Secundary' : 'Cancel'}
              />
              <Button
                title="Editar"
                onPress={handleEditClub}
                style={{ flex: 1 }}
                type="Secundary"
              />
            </Actions>
          </Content>
        </ScrollView>
      </Container>
    </Background>
  )
}
