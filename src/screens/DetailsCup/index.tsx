import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'

import { useClubs } from '../../hook/useClubs'
import { useMatch } from '../../hook/useMatch'
import { getCupComplete, updateCup } from '../../lib/asyncstorage/cup'
import { getMatchStats, getRoundsCup } from '../../lib/asyncstorage/matchs'

import { CupComplete, emptyCupComplete } from '../../Model/Cup'
import { ClubShort, emptyClub } from '../../Model/Club'
import { ItemClassification } from '../../Model/ItemClassification'
import { ModeMatch } from '../../Model/ModeMatch'
import { MatchComplete, emptyMatchStats } from '../../Model/Match'
import { Background } from '../../components/Background'
import { Classification } from './components/Classification'
import { CupAwards } from './components/CupAwards'
import { InfoCup } from './components/InfoCup'
import { Loading } from '../../components/Loading'
import { Matchs } from './components/Matchs'
import { TableCup } from './components/TableCup'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'
import { ViewOption } from '../../components/ViewOption'

import { getClassification } from '../../utils/getClassification'
import { getWinnerClubInMatch } from '../../utils/getClubWinnerInMatch'

import { Container } from './styles'

export interface DetailsCupRouteParams {
  idCup: string
}
const OPTIONS = ['Detalhes', 'Tabela', 'Jogos', 'Prêmios']

interface RoundMatch {
  matchs: MatchComplete[]
  numberRound: number
}

export function DetailsCup() {
  const { clubs } = useClubs()
  const { removeMatch } = useMatch()
  const { idCup } = useRoute().params as DetailsCupRouteParams

  const [loading, setLoading] = useState(false)
  const [option, setOption] = useState('Detalhes')
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
      let roundCurrent = rounds.length

      const roundsMatchs: RoundMatch[] = await Promise.all(
        rounds.map(async (rd, indexRound) => {
          const roundIndexToCurrent = indexRound + 1
          const matchs: MatchComplete[] = await Promise.all(
            rd.matchs.map(async (match) => {
              const stats = await getMatchStats(match.idStats)
              if (
                stats.status === 'start' &&
                roundCurrent > roundIndexToCurrent
              ) {
                roundCurrent = roundIndexToCurrent
              }
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

      setRoundSelected(roundCurrent)

      if (hasMatchFinished && cup.status === 'start') {
        await updateCup({ ...cup, status: 'progress' })
        setCup({ ...cup, status: 'progress' })
      } else if (allMatchsFinished && cup.status === 'progress') {
        await updateCup({ ...cup, status: 'closed' })
        setCup({ ...cup, status: 'closed' })
      }

      setRounds(roundsMatchs)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [clubs, idCup, removeMatch])

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

  const awardsCup = useMemo((): {
    first: ClubShort | undefined
    secund: ClubShort | undefined
    third: ClubShort | undefined
    promotions: (ClubShort | undefined)[]
    relegations: (ClubShort | undefined)[]
  } => {
    if (cup.type === 'League' && cup.status === 'closed') {
      let first: ClubShort | undefined
      let secund: ClubShort | undefined
      let third: ClubShort | undefined
      if (clubsItemClass.length > 0) {
        first = clubsItemClass[0].club
      }
      if (clubsItemClass.length > 1) {
        secund = clubsItemClass[1].club
      }
      if (clubsItemClass.length > 2) {
        third = clubsItemClass[2].club
      }
      return {
        first,
        secund,
        third,
        promotions: clubsItemClass
          .slice(0, cup.numberClubsPromoted)
          .map((i) => i.club),
        relegations: clubsItemClass
          .slice(-cup.numberClubsRelegated)
          .map((i) => i.club),
      }
    } else if (cup.type === 'Cup') {
      let first: ClubShort | undefined
      let secund: ClubShort | undefined
      let third: ClubShort | undefined
      const roundFinal = rounds.find((item) => item.numberRound === 1)
      if (roundFinal) {
        const match = roundFinal.matchs[0]
        if (match.stats.status === 'finished') {
          const idWinner = getWinnerClubInMatch(
            match.stats,
            match.statsTrip || emptyMatchStats,
            match.home.id,
            match.away.id,
          )
          if (idWinner === match.home.id) {
            first = match.home
            secund = match.away
          } else {
            first = match.away
            secund = match.home
          }
        }
      }
      if (cup.hasThirdPlace) {
        const roundThird = rounds.find((item) => item.numberRound === 2)
        if (roundThird) {
          const match = roundThird.matchs[0]
          if (match.stats.status === 'finished') {
            const idWinner = getWinnerClubInMatch(
              match.stats,
              match.statsTrip || emptyMatchStats,
              match.home.id,
              match.away.id,
            )
            if (idWinner === match.home.id) {
              third = match.home
            } else {
              third = match.away
            }
          }
        }
      }

      return {
        first,
        secund,
        third,
        promotions: [],
        relegations: [],
      }
    } else {
      return {
        first: undefined,
        secund: undefined,
        third: undefined,
        promotions: [],
        relegations: [],
      }
    }
  }, [
    clubsItemClass,
    cup.hasThirdPlace,
    cup.numberClubsPromoted,
    cup.numberClubsRelegated,
    cup.status,
    cup.type,
    rounds,
  ])

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
          ) : option === 'Detalhes' ? (
            <InfoCup
              idCup={cup.id}
              type={cup.type}
              hasTripRound={cup.roundTrip}
              hasThirdPlace={cup.hasThirdPlace}
              pointsToWin={cup.winPoints}
              pointsToDraw={cup.drawPoints}
              pointsToLoss={cup.lossPoints}
              numberPromotionClubs={cup.numberClubsPromoted}
              numberRelegationClubs={cup.numberClubsRelegated}
            />
          ) : option === 'Tabela' ? (
            cup.type === 'Cup' ? (
              <TableCup rounds={rounds} hasThirdPlace={cup.hasThirdPlace} />
            ) : (
              <Classification
                listItemClass={clubsItemClass}
                numberClubsPromotion={cup.numberClubsPromoted}
                numberClubsRelegation={cup.numberClubsRelegated}
              />
            )
          ) : option === 'Jogos' ? (
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
          ) : (
            <CupAwards
              typeCup={cup.type}
              champions={awardsCup.first}
              secund={awardsCup.secund}
              hasThirdPlace={cup.hasThirdPlace}
              third={awardsCup.third}
              numberClubs={cup.numberClubs}
              clubsRenegations={awardsCup.relegations}
              clubsPromotions={awardsCup.promotions}
            />
          )}
        </ViewOption>
      </Container>
    </Background>
  )
}
