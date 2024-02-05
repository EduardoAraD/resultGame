import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { getClubComplete } from '../../lib/asyncstorage/clubs'

import { ClubComplete, emptyClubComplete } from '../../Model/Club'
import { Background } from '../../components/Background'
import { LineInfo } from './components/LineInfo'
import { Loading } from '../../components/Loading'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
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
  const [club, setClub] = useState<ClubComplete>(emptyClubComplete)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    loadClub()
  }, [loadClub])

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title={club.name} />
        <ScrollView>
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
                  <LineInfo title="Sigla" text={club.name} />
                  <LineInfo title="Estádio" text={club.stadium} />
                </>
              )}
            </Info>
            <Overrall>Overrall</Overrall>
            <ViewOver>
              <TextOver>{club.overall}</TextOver>
            </ViewOver>
          </Content>
        </ScrollView>
      </Container>
    </Background>
  )
}
