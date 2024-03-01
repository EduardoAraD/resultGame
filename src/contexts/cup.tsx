import { ReactNode, createContext, useCallback, useState } from 'react'

import { getCupComplete, updateCup } from '../lib/asyncstorage/cup'
import { getMatchStats, getRoundsCup } from '../lib/asyncstorage/matchs'
import { useClubs } from '../hook/useClubs'

import { ClubShort, emptyClub } from '../Model/Club'
import { CupComplete, emptyCupComplete } from '../Model/Cup'
import { MatchComplete, MatchStats, emptyMatchStats } from '../Model/Match'
import { ItemClassification } from '../Model/ItemClassification'
import { ModeMatch } from '../Model/ModeMatch'

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
      const cup = await getCupComplete(idCup)
      if (!cup) {
        console.log('Not Cup')
        return
      }
      setCup(cup)

      const rounds = await getRoundsCup(idCup)

      const clubsCup = clubs.filter((club) =>
        cup.idsClubs.find((id) => id === club.id),
      )
      setClubsShort(clubsCup)
      let hasMatchFinished = cup.status !== 'start'
      let allMatchsFinished = true
      let roundCurrentCup = rounds.length

      const roundsMatchs: RoundMatch[] = await Promise.all(
        rounds.map(async (rd, indexRound) => {
          const roundIndexToCurrent = indexRound + 1
          const matchs: MatchComplete[] = await Promise.all(
            rd.matchs.map(async (match) => {
              const stats = await getMatchStats(match.idStats)
              if (
                stats.status === 'start' &&
                roundCurrentCup > roundIndexToCurrent
              ) {
                roundCurrentCup = roundIndexToCurrent
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

      setRoundCurrent(roundCurrentCup)

      if (hasMatchFinished && cup.status === 'start') {
        await updateCup({ ...cup, status: 'progress' })
        setCup({ ...cup, status: 'progress' })
      } else if (allMatchsFinished && cup.status === 'progress') {
        await updateCup({ ...cup, status: 'closed' })
        setCup({ ...cup, status: 'closed' })
      }

      setRounds(roundsMatchs)
    },
    [clubs],
  )

  const getClassificationInLeague = useCallback(
    (hasMatchIsStatusProgress?: boolean) => {
      if (cup) {
        const matchsFinished: MatchComplete[] = []
        rounds.forEach((round) => {
          round.matchs.forEach((match) => {
            if (hasMatchIsStatusProgress && match.stats.status !== 'start') {
              matchsFinished.push(match)
            } else if (match.stats.status === 'finished') {
              matchsFinished.push(match)
            }
          })
        })
        return getClassification(matchsFinished, clubsShort, {
          win: cup.winPoints,
          draw: cup.drawPoints,
          loss: cup.lossPoints,
        })
      }
      return []
    },
    [clubsShort, cup, rounds],
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
