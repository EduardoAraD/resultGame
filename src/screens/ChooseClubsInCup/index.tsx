import { useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { ShieldPlus } from 'phosphor-react-native'
import { randomUUID } from 'expo-crypto'

import { createCup } from '../../lib/asyncstorage/cup'
import { saveRoundsInCup } from '../../lib/asyncstorage/matchs'
import { CupRoutesNavigationProps } from '../../routes/routes/cup.routes'

import { ClubShort } from '../../Model/Club'
import { CupComplete } from '../../Model/Cup'
import { Match, Round } from '../../Model/Match'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { ButtonIconOver } from '../../components/ButtonIconOver'
import { CardClub } from '../../components/CardClub'
import { EmptyList } from '../../components/EmptyList'
import { ModalChooseClub } from '../../components/Modal'
import { TitleFlatlist } from '../../components/TitleFlatlist'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import { createRoundsLeague } from '../../utils/createRoundsLeague'
import { Container, IconTrash, ViewRemove } from './styles'

export interface ChooseClubsInCupRouteParams {
  cup: CupComplete
}

export function ChooseClubsInCup() {
  const { navigate } = useNavigation<CupRoutesNavigationProps>()
  const { cup } = useRoute().params as ChooseClubsInCupRouteParams

  const [clubs, setClubs] = useState<ClubShort[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleAddClub(club: ClubShort) {
    setClubs((state) => [...state, club])
  }

  function handleRemoveClub(clubId: string) {
    setClubs((state) => state.filter((item) => item.id !== clubId))
  }

  async function handleCreateCup() {
    try {
      if (clubs.length <= 1) {
        return
      }
      setLoading(true)

      const listIdsClubs = clubs.map((club) => club.id)

      const newCup: CupComplete = {
        ...cup,
        numberClubs: clubs.length,
        idsClubs: listIdsClubs,
      }

      const rounds = createRoundsLeague(clubs)
      const roundsCup: Round[] = rounds.map((round) => {
        const matchs: Match[] = round.matchs.map((match) => ({
          homeIdClub: match.home.id,
          awayIdClub: match.away.id,
          idStats: randomUUID(),
        }))
        const roundCup: Round = {
          numberRound: round.index,
          matchs,
        }
        return roundCup
      })

      if (newCup.roundTrip) {
        const numberRounds = roundsCup.length
        const roundsInverted: Round[] = roundsCup.map((round) => {
          const matchs: Match[] = round.matchs.map((match) => ({
            homeIdClub: match.awayIdClub,
            awayIdClub: match.homeIdClub,
            idStats: randomUUID(),
          }))
          const roundCup: Round = {
            numberRound: round.numberRound + numberRounds,
            matchs,
          }

          return roundCup
        })

        roundsInverted.forEach((item) => roundsCup.push(item))
      }

      await Promise.all([
        createCup(newCup),
        saveRoundsInCup(roundsCup, newCup.id),
      ])

      navigate('homeCup')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const disabledButton = useMemo(() => {
    return cup.numberClubs > clubs.length || clubs.length <= 1
  }, [clubs.length, cup.numberClubs])

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title="Definir clubes" />
        <TitleFlatlist title="Clubes participantes" quantity={clubs.length} />

        <FlatList
          data={clubs}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <Swipeable
                overshootLeft={false}
                leftThreshold={10}
                renderRightActions={() => null}
                onSwipeableOpen={() => handleRemoveClub(item.id)}
                renderLeftActions={() => (
                  <ViewRemove>
                    <IconTrash />
                  </ViewRemove>
                )}
              >
                <CardClub
                  club={item}
                  onPress={() => handleRemoveClub(item.id)}
                />
              </Swipeable>
            </GestureHandlerRootView>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={() => <EmptyList text="Sem clubes" />}
        />
        <ButtonIconOver
          onPress={() => setShowModal(true)}
          icon={ShieldPlus}
          style={{ bottom: 70 }}
        />
        <Button
          title="Criar campeonato"
          loading={loading}
          disabled={disabledButton}
          onPress={handleCreateCup}
        />
      </Container>
      <ModalChooseClub
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelectedClub={handleAddClub}
        homeOrAway="home"
        clubsBlocked={clubs}
      />
    </Background>
  )
}
