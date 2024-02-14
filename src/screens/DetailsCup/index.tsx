import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'

import { useClubs } from '../../hook/useClubs'
import { getCupComplete, updateCup } from '../../lib/asyncstorage/cup'
import { getMatchStats, getRoundsCup } from '../../lib/asyncstorage/matchs'

import { CupComplete, emptyCupComplete } from '../../Model/Cup'
import { ClubShort, emptyClub } from '../../Model/Club'
import { ItemClassification } from '../../Model/ItemClassification'
import { MatchComplete } from '../../Model/Match'
import { Background } from '../../components/Background'
import { Classification } from './components/Classification'
import { InfoCup } from './components/InfoCup'
import { Loading } from '../../components/Loading'
import { Matchs } from './components/Matchs'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'
import { ViewOption } from '../../components/ViewOption'

import { getClassification } from '../../utils/getClassification'

import { Container } from './styles'
import { ModeMatch } from '../../Model/ModeMatch'
import { useMatch } from '../../hook/useMatch'

export interface DetailsCupRouteParams {
  idCup: string
}
const OPTIONS = ['Informações', 'Tabela', 'Jogos']

interface RoundMatch {
  matchs: MatchComplete[]
  numberRound: number
}

export function DetailsCup() {
  const { clubs } = useClubs()
  const { removeMatch } = useMatch()
  const { idCup } = useRoute().params as DetailsCupRouteParams

  const [loading, setLoading] = useState(false)
  const [option, setOption] = useState('Informações')
  const [cup, setCup] = useState<CupComplete>(emptyCupComplete)
  const [roundSelected, setRoundSelected] = useState(1)
  const [rounds, setRounds] = useState<RoundMatch[]>([])

  const loadCup = useCallback(async () => {
    try {
      setLoading(true)

      const cup = await getCupComplete(idCup)
      if (!cup) {
        console.log('Not Cup')
        return
      }
      setCup(cup)
      removeMatch()

      const rounds = await getRoundsCup(idCup)
      const clubsCup = clubs.filter((club) =>
        cup.idsClubs.find((id) => id === club.id),
      )
      let hasMatchFinished = cup.status !== 'start'
      let allMatchsFinished = true

      const roundsMatchs: RoundMatch[] = await Promise.all(
        rounds.map(async (rd) => {
          const matchs: MatchComplete[] = await Promise.all(
            rd.matchs.map(async (match) => {
              const stats = await getMatchStats(match.idStats)
              const statsTrip = match.idStatsTrip
                ? await getMatchStats(match.idStatsTrip)
                : undefined
              const clubHome = clubsCup.find(
                (club) => club.id === match.homeIdClub,
              )
              const clubAway = clubsCup.find(
                (club) => club.id === match.awayIdClub,
              )

              const typeStats: ModeMatch =
                cup.type === 'Cup'
                  ? cup.roundTrip
                    ? 'Volta'
                    : 'Mata-Mata'
                  : 'Normal'

              const matchCompleted: MatchComplete = {
                home: clubHome || emptyClub,
                away: clubAway || emptyClub,
                stats: { ...stats, type: typeStats },
                statsTrip:
                  statsTrip !== undefined
                    ? { ...statsTrip, type: 'Ida' }
                    : undefined,
              }
              console.log(
                `${matchCompleted.home.name} x ${matchCompleted.away.name} -> ${typeStats}`,
              )
              if (stats.status === 'finished' && !hasMatchFinished) {
                hasMatchFinished = true
              } else if (stats.status === 'start' && allMatchsFinished) {
                allMatchsFinished = false
              }
              return matchCompleted
            }),
          )

          const roundMatch: RoundMatch = {
            numberRound: rd.numberRound + 1,
            matchs,
          }
          return roundMatch
        }),
      )

      if (hasMatchFinished && cup.status === 'start') {
        await updateCup({ ...cup, status: 'progress' })
      } else if (allMatchsFinished && cup.status === 'progress') {
        await updateCup({ ...cup, status: 'closed' })
      }

      setRounds(roundsMatchs)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [clubs, idCup])

  useFocusEffect(
    useCallback(() => {
      loadCup()
    }, [loadCup]),
  )

  const clubsItemClass: ItemClassification[] = useMemo(() => {
    const matchsFinished: MatchComplete[] = []
    rounds.forEach((round) => {
      round.matchs.forEach((match) => {
        if (match.stats.status === 'finished') {
          matchsFinished.push(match)
        }
      })
    })

    const clubsinCup: ClubShort[] = clubs.filter((club) =>
      cup.idsClubs.find((id) => id === club.id),
    )

    return getClassification(matchsFinished, clubsinCup, {
      win: cup.winPoints,
      draw: cup.drawPoints,
      loss: cup.lossPoints,
    })
  }, [
    clubs,
    cup.drawPoints,
    cup.idsClubs,
    cup.lossPoints,
    cup.winPoints,
    rounds,
  ])

  const matchsRound = useMemo(() => {
    const roundSelec =
      cup.type === 'Cup' ? rounds.length - roundSelected + 1 : roundSelected
    const roundFind = rounds.find((round) => round.numberRound === roundSelec)
    if (roundFind) {
      return roundFind.matchs
    } else {
      return []
    }
  }, [cup.type, roundSelected, rounds])

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title={cup.name} />
        <View style={{ height: 30 }} />
        <ViewOption
          options={OPTIONS}
          optionSelected={option}
          onOptionSelected={setOption}
        >
          {loading ? (
            <Loading />
          ) : option === 'Informações' ? (
            <InfoCup
              type={cup.type}
              hasTripRound={cup.roundTrip}
              hasThirdPlace={cup.hasThirdPlace}
              pointsToWin={cup.winPoints}
              pointsToDraw={cup.drawPoints}
              pointsToLoss={cup.lossPoints}
              hasAwayGoal={cup.hasAwayGoal}
              numberPromotionClubs={cup.numberClubsPromoted}
              numberRelegationClubs={cup.numberClubsRelegated}
            />
          ) : option === 'Tabela' ? (
            <Classification
              listItemClass={clubsItemClass}
              numberClubsPromotion={cup.numberClubsPromoted}
              numberClubsRelegation={cup.numberClubsRelegated}
            />
          ) : (
            <Matchs
              maxRound={rounds.length}
              round={roundSelected}
              onRound={setRoundSelected}
              matchs={matchsRound}
              nameCup={cup.name}
              hasThirdPlace={cup.hasThirdPlace}
              typeCup={cup.type}
              idCup={cup.id}
            />
          )}
        </ViewOption>
      </Container>
    </Background>
  )
}
