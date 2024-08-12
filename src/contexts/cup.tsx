import { ReactNode, createContext, useCallback, useState } from 'react'

import { getCupComplete, updateCup } from '../lib/asyncstorage/cup'
import { getMatchStats, getRoundsCup } from '../lib/asyncstorage/matchs'
import { useClubs } from '../hook/useClubs'

import { ClubShort, emptyClub } from '../Model/Club'
import { CupComplete, emptyCupComplete } from '../Model/Cup'
import { MatchComplete, MatchStats, emptyMatchStats } from '../Model/Match'
import { ItemClassification } from '../Model/ItemClassification'

import { getClassification } from '../utils/getClassification'

interface CupProviderProps {
  children: ReactNode
}

interface RoundMatch {
  matchs: MatchComplete[]
  numberRound: number
}

type CupContextDataProps = {
  cup: CupComplete
  rounds: RoundMatch[]
  roundCurrent: number
  getClassificationInLeague(
    hasMatchIsStatusProgress?: boolean,
  ): ItemClassification[]
  loadInfoCupById(idCup: string): Promise<void>
  updateMatchLive: (
    idMatchStats: string,
    goalHome: number,
    goalAway: number,
  ) => void
  updateMatchCompleted(idMatchStats: string, stats: MatchStats): void
}

export const CupContext = createContext<CupContextDataProps>(
  {} as CupContextDataProps,
)

export function CupProvider({ children }: CupProviderProps) {
  const { clubs } = useClubs()

  const [cup, setCup] = useState<CupComplete>(emptyCupComplete)
  const [clubsShort, setClubsShort] = useState<ClubShort[]>([])
  const [rounds, setRounds] = useState<RoundMatch[]>([])
  const [roundCurrent, setRoundCurrent] = useState(1)

  const loadInfoCupById = useCallback(
    async (idCup: string) => {
      const cupCompleted = await getCupComplete(idCup)
      if (!cupCompleted) {
        return
      }
      setCup(cupCompleted)

      const rounds = await getRoundsCup(idCup)

      const clubsCup = clubs.filter((club) =>
        cupCompleted.idsClubs.find((id) => id === club.id),
      )
      setClubsShort(clubsCup)
      let hasMatchFinished = cupCompleted.status !== 'start'
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
                cupCompleted.type === 'Cup'
                  ? cupCompleted.roundTrip
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

      let roundCurrentCup = cupCompleted.type === 'Cup' ? 1 : rounds.length
      roundsMatchs.forEach((round, indexRound) => {
        const roundIndexToCurrent = indexRound + 1
        round.matchs.forEach((match) => {
          if (cupCompleted.type === 'Cup') {
            if (
              match.stats.status === 'start' &&
              roundCurrentCup < roundIndexToCurrent
            ) {
              roundCurrentCup = roundIndexToCurrent
            }
          }
          if (
            match.stats.status === 'start' &&
            roundCurrentCup > roundIndexToCurrent
          ) {
            roundCurrentCup = roundIndexToCurrent
          }
        })
      })

      const roundCurrentDefinited =
        cupCompleted.type === 'Cup'
          ? rounds.length - roundCurrentCup + 1
          : roundCurrentCup
      setRoundCurrent(roundCurrentDefinited)

      if (hasMatchFinished && cupCompleted.status === 'start') {
        await updateCup({ ...cupCompleted, status: 'progress' })
        setCup({ ...cupCompleted, status: 'progress' })
      } else if (allMatchsFinished && cupCompleted.status === 'progress') {
        await updateCup({ ...cupCompleted, status: 'closed' })
        setCup({ ...cupCompleted, status: 'closed' })
      }

      setRounds(roundsMatchs)
    },
    [clubs],
  )

  const getClassificationInLeague = useCallback(
    (hasMatchIsStatusProgress?: boolean) => {
      const matchsForClassification: MatchComplete[] = []
      rounds.forEach((round) => {
        round.matchs.forEach((match) => {
          const isMatchForClassification =
            match.stats.status === 'finished' ||
            (hasMatchIsStatusProgress && match.stats.status === 'progress')

          if (isMatchForClassification) {
            matchsForClassification.push(match)
          }
        })
      })

      return getClassification({
        matchsOfSeason: matchsForClassification,
        clubs: clubsShort,
        points: {
          win: cup.pointsForWin,
          loss: cup.pointsForLoss,
          draw: cup.pointsForDraw,
        },
        numberClubsPromoted: cup.numberClubsPromoted,
        numberClubsRelegated: cup.numberClubsRelegated,
      })
    },
    [
      clubsShort,
      cup.numberClubsPromoted,
      cup.numberClubsRelegated,
      cup.pointsForDraw,
      cup.pointsForLoss,
      cup.pointsForWin,
      rounds,
    ],
  )

  const updateMatchLive = useCallback(
    (idMatchStats: string, goalHome: number, goalAway: number) =>
      setRounds((state) =>
        state.map((round) => {
          const matchs: MatchComplete[] = round.matchs.map((match) =>
            match.stats.id === idMatchStats
              ? {
                  ...match,
                  stats: {
                    ...match.stats,
                    goalAway,
                    goalHome,
                    status: 'progress',
                  },
                }
              : {
                  ...match,
                  stats:
                    match.stats.status === 'progress'
                      ? emptyMatchStats
                      : match.stats,
                },
          )

          return { ...round, matchs }
        }),
      ),
    [],
  )

  const updateMatchCompleted = useCallback(
    (idMatchStats: string, stats: MatchStats) =>
      setRounds((state) =>
        state.map((round) => {
          const matchs: MatchComplete[] = round.matchs.map((match) => {
            if (match.stats.id === idMatchStats) {
              return { ...match, stats }
            }
            if (match.statsTrip) {
              return match.statsTrip.id === idMatchStats
                ? { ...match, statsTrip: stats }
                : match
            }
            return match
          })

          return { ...round, matchs }
        }),
      ),
    [],
  )

  return (
    <CupContext.Provider
      value={{
        cup,
        rounds,
        roundCurrent,
        loadInfoCupById,
        getClassificationInLeague,
        updateMatchCompleted,
        updateMatchLive,
      }}
    >
      {children}
    </CupContext.Provider>
  )
}
