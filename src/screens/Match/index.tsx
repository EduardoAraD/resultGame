import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useKeepAwake } from 'expo-keep-awake'

import { MatchRoutesNavigationProps } from '../../routes/routes/match.routes'
import { useCup } from '../../hook/useCup'
import { useMatch } from '../../hook/useMatch'

import { ClubComplete } from '../../Model/Club'
import { DomainClube } from '../../Model/DomainClub'
import { MatchStats } from '../../Model/Match'
import { ModeMatch } from '../../Model/ModeMatch'
import { Moment, MomentComplete } from '../../Model/Moment'
import { Stats, emptyStats } from '../../Model/Stats'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { Domination } from '../../components/Domination'
import { Placar } from '../../components/Placar'
import { ViewGame } from '../../components/ViewGame'

import { chanceDeGolPenalt } from '../../utils/chanceDeGol'
import { domainGame } from '../../utils/domainGame'
import { currentPlacarMoment } from '../../utils/functions/GoalChange/finished'
import { getChanceGoal } from '../../utils/functions/GoalChange/contructionPlay'
import { ProxChanceClub } from '../../utils/functions/GoalChange/interfaces'

import { Container, ContentInfo, DivAction, Stadium } from './styles'

export interface MatchRouteProps {
  home: ClubComplete
  away: ClubComplete
  modeGame: ModeMatch
  idMatch?: string
  placarMatchTrip?: {
    goalHome: number
    goalAway: number
  }
}

export function Match() {
  const { navigate, goBack } = useNavigation<MatchRoutesNavigationProps>()
  const params = useRoute().params as MatchRouteProps
  const { updateStatsMatch } = useMatch()
  const { updateMatchCompleted, updateMatchLive } = useCup()
  useKeepAwake()

  const durationMomentGame = 900 // 900 milisegundos

  const logoHome = params.home.logo
  const logoAway = params.away.logo
  const { modeGame, placarMatchTrip } = params

  const [goalHome, setGoalHome] = useState(0)
  const [goalAway, setGoalAway] = useState(0)
  const [homePenalt, setHomePenalt] = useState(0)
  const [awayPenalt, setAwayPenalt] = useState(0)
  const [velocityGame, setVelocityGame] = useState(1)

  const [allMoments, setAllMoments] = useState<MomentComplete[]>([])

  const [momentsNarration, setMomentsNarration] = useState<MomentComplete[]>([])
  const [momentsHighlight, setMomentsHighlight] = useState<MomentComplete[]>([])
  const [indexMomentCurrent, setIndexMomentCurrent] = useState(0)
  const [hasPenalts, setHasPenalts] = useState(false)
  const [minuteGame, setMinuteGame] = useState(0)

  const [statsHome, setStatsHome] = useState<Stats>(emptyStats)
  const [statsAway, setStatsAway] = useState<Stats>(emptyStats)

  const [domainHome, setDomainHome] = useState<DomainClube>({
    domain: 50,
    overrall: 0,
    nameClube: '',
  })
  const [domainAway, setDomainAway] = useState<DomainClube>({
    domain: 50,
    overrall: 0,
    nameClube: '',
  })

  function goHome() {
    navigate('homeMatch')
  }

  async function handleFinishedMatch() {
    if (params.idMatch) {
      const { idMatch, modeGame } = params
      const statsMatchCompleted: MatchStats = {
        id: idMatch,
        goalHome,
        goalAway,
        goalHomePenal: homePenalt,
        goalAwayPenal: awayPenalt,
        type: modeGame,
        status: 'finished',
        homeStats: statsHome,
        awayStats: statsAway,
      }
      updateMatchCompleted(idMatch, statsMatchCompleted)
      await updateStatsMatch(statsMatchCompleted)

      goBack()
    } else {
      goHome()
    }
  }

  function handleUpdateVelocityGame() {
    if (velocityGame === 3) {
      setVelocityGame(1)
    } else {
      setVelocityGame((state) => state + 1)
    }
  }

  const momentsTheGame = useCallback(
    (
      min: number,
      domHome: DomainClube,
      domAway: DomainClube,
      goalHomeClub: number,
      goalAwayClub: number,
      proxMoment: ProxChanceClub,
    ): {
      moments: MomentComplete[]
      proxMoment: ProxChanceClub
    } => {
      if (min === 1) {
        const newMoment: MomentComplete = {
          minute: min,
          narracao: 'Início de Jogo.',
          homeOrAway: 'game',
          stats: emptyStats,
          domainHome: 50,
          domainAway: 50,
          id: -1,
        }
        return {
          moments: [newMoment],
          proxMoment: 'NORMAL',
        }
      }
      if (min === 45) {
        const newMoment: MomentComplete = {
          minute: min,
          narracao: 'Intervalo de jogo.',
          homeOrAway: 'game',
          stats: emptyStats,
          domainHome: 50,
          domainAway: 50,
          id: -1,
        }
        return {
          moments: [newMoment],
          proxMoment: 'NORMAL',
        }
      }
      if (min === 90) {
        const goalHomeAll =
          (placarMatchTrip !== undefined ? placarMatchTrip.goalHome : 0) +
          goalHomeClub
        const goalAwayAll =
          (placarMatchTrip !== undefined ? placarMatchTrip.goalAway : 0) +
          goalAwayClub

        const notIsFinal =
          modeGame !== 'Normal' &&
          modeGame !== 'Ida' &&
          goalHomeAll === goalAwayAll
        const newMoment: MomentComplete = {
          minute: min,
          narracao: notIsFinal ? 'Vamos para os Penaltis' : 'Final de Jogo.',
          homeOrAway: 'game',
          stats: emptyStats,
          domainAway: 50,
          domainHome: 50,
          id: -1,
        }
        return {
          moments: [newMoment],
          proxMoment: 'NORMAL',
        }
      } else {
        const { home, away } = domainGame({
          home: domHome,
          away: domAway,
        })

        const homeDomainChance =
          proxMoment !== 'NORMAL' ? domHome.domain : home.domain
        const awayDomainChance =
          proxMoment !== 'NORMAL' ? domAway.domain : away.domain

        if (homeDomainChance >= 80 || awayDomainChance >= 80) {
          const howClubAttack = homeDomainChance >= 80 ? 'home' : 'away'

          const newResultChance = getChanceGoal({
            minute: min,
            homeOrAway: howClubAttack,
            domain: {
              home: homeDomainChance,
              away: awayDomainChance,
            },
            nameClubAttack:
              howClubAttack === 'home' ? home.nameClube : away.nameClube,
            nameClubDefense:
              howClubAttack === 'away' ? away.nameClube : home.nameClube,
            proxMoment,
          })

          return {
            moments: newResultChance.moments,
            proxMoment: newResultChance.proxChance,
          }
        }

        const newMoment: MomentComplete = {
          minute: min,
          narracao: '',
          homeOrAway: 'game',
          stats: emptyStats,
          domainHome: home.domain,
          domainAway: away.domain,
          id: -1,
        }
        return {
          // domHome: { ...home },
          // domAway: { ...away },
          moments: [newMoment],
          proxMoment: 'NORMAL',
        }
      }
    },
    [modeGame, placarMatchTrip],
  )

  function PenaltsOver(
    goalPenalHome: number,
    RemainingPenalHome: number,
    goalPenalAway: number,
    RemainingPenalAway: number,
  ): boolean {
    return (
      goalPenalAway > RemainingPenalHome + goalPenalHome ||
      goalPenalHome > RemainingPenalAway + goalPenalAway
    )
  }

  const gamePenalts = useCallback(() => {
    const numberPenalt = 5
    let momentsPen: Moment[] = []
    const overrallHome = params.home.overall
    const nameClubHome = params.home.name
    let homeGoalPen = 0
    const overrallAway = params.away.overall
    const nameClubAway = params.away.name
    let awayGoalPen = 0
    const overrallAllClub = overrallHome + overrallAway
    let itsOver = false

    const arrayNumberPenalt = Array.from({ length: numberPenalt })
    // cobranças iniciais
    arrayNumberPenalt.forEach((_, i) => {
      if (!itsOver) {
        const penaltHomeMoment = chanceDeGolPenalt(
          overrallHome,
          overrallAllClub,
          nameClubHome,
          'home',
          i + 1,
        )
        momentsPen = [...momentsPen, ...penaltHomeMoment]

        const hasHomeGoal = penaltHomeMoment.find((i) => i.goal)
        homeGoalPen = homeGoalPen + (hasHomeGoal ? 1 : 0)
        if (
          PenaltsOver(
            homeGoalPen,
            numberPenalt - (i + 1),
            awayGoalPen,
            numberPenalt - i,
          )
        ) {
          itsOver = true
        }

        if (!itsOver) {
          const penaltAwayMoment = chanceDeGolPenalt(
            overrallAway,
            overrallAllClub,
            nameClubAway,
            'away',
            i + 1,
          )
          momentsPen = [...momentsPen, ...penaltAwayMoment]

          const hasAwayGoal = penaltAwayMoment.find((i) => i.goal)
          awayGoalPen = awayGoalPen + (hasAwayGoal ? 1 : 0)
          if (
            PenaltsOver(
              homeGoalPen,
              numberPenalt - (i + 1),
              awayGoalPen,
              numberPenalt - (i + 1),
            )
          ) {
            itsOver = true
          }
        }
      }
    })

    let numberAlternadas = 1
    if (homeGoalPen === awayGoalPen) {
      // Alternadas
      while (homeGoalPen === awayGoalPen) {
        const penaltHomeMoment = chanceDeGolPenalt(
          overrallHome,
          overrallAllClub,
          nameClubHome,
          'home',
          numberPenalt + numberAlternadas,
        )
        momentsPen = [...momentsPen, ...penaltHomeMoment]

        const hasHomeGoal = penaltHomeMoment.find((i) => i.goal)
        homeGoalPen = homeGoalPen + (hasHomeGoal ? 1 : 0)

        const penaltAwayMoment = chanceDeGolPenalt(
          overrallAway,
          overrallAllClub,
          nameClubAway,
          'away',
          numberPenalt + numberAlternadas,
        )
        momentsPen = [...momentsPen, ...penaltAwayMoment]

        const hasAwayGoal = penaltAwayMoment.find((i) => i.goal)
        awayGoalPen = awayGoalPen + (hasAwayGoal ? 1 : 0)

        numberAlternadas = numberAlternadas + 1
      }
    }

    const objFinal: Moment = {
      minute: 90,
      narracao: 'Final de jogo.',
      homeOrAway: 'game',
      stats: emptyStats,
    }
    momentsPen.push(objFinal)

    return momentsPen
  }, [
    params.home.overall,
    params.home.name,
    params.away.overall,
    params.away.name,
  ])

  const buildGame = useCallback(() => {
    const numberMinutesGame = 90
    const multiHomeOverall = modeGame === 'Mata-Mata' ? 1 : 1.05
    const arrayMinutes = Array.from({ length: numberMinutesGame })
    const { home, away } = params
    const domainHomeClub: DomainClube = {
      domain: 50,
      overrall: home.overall * multiHomeOverall,
      nameClube: home.name,
    }
    const domainAwayClub: DomainClube = {
      domain: 50,
      overrall: away.overall,
      nameClube: away.name,
    }
    const momentsToGame: MomentComplete[] = []
    let goalHomeClub = 0
    let goalAwayClub = 0
    let proxMomentInGame: ProxChanceClub = 'NORMAL'

    arrayMinutes.forEach((_, indexMinute) => {
      const minuteNow = indexMinute + 1
      const { moments, proxMoment } = momentsTheGame(
        minuteNow,
        domainHomeClub,
        domainAwayClub,
        goalHomeClub,
        goalAwayClub,
        proxMomentInGame,
      )

      proxMomentInGame = proxMoment
      const lenthMoments = moments.length
      domainHomeClub.domain = moments[lenthMoments - 1].domainHome
      domainAwayClub.domain = moments[lenthMoments - 1].domainAway
      moments.forEach((mon) =>
        momentsToGame.push({
          ...mon,
          id: 0,
        }),
      )

      const momentGoal = moments.find((i) => i.goal)
      if (momentGoal) {
        let nameClub = ''
        if (momentGoal.homeOrAway === 'home') {
          goalHomeClub += 1
          nameClub = home.name
        } else {
          goalAwayClub += 1
          nameClub = away.name
        }

        const moment = currentPlacarMoment(
          momentGoal.minute,
          nameClub,
          momentGoal.homeOrAway === 'home' ? 'home' : 'away',
          goalHomeClub,
          goalAwayClub,
        )

        domainHomeClub.domain = 50
        domainAwayClub.domain = 50
        momentsToGame.push(moment)
      }
    })

    if (modeGame !== 'Normal' && modeGame !== 'Ida') {
      const goalHomeClub = momentsToGame.filter(
        (i) => i.goal && i.homeOrAway === 'home',
      ).length
      const goalAwayClub = momentsToGame.filter(
        (i) => i.goal && i.homeOrAway === 'away',
      ).length

      const goalHomeAllMatchs =
        goalHomeClub +
        (placarMatchTrip !== undefined ? placarMatchTrip.goalHome : 0)
      const goalAwayAllMatchs =
        (placarMatchTrip !== undefined ? placarMatchTrip.goalAway : 0) +
        goalAwayClub

      if (goalHomeAllMatchs === goalAwayAllMatchs) {
        const momentsPenal = gamePenalts()
        momentsPenal.forEach((mon) =>
          momentsToGame.push({
            ...mon,
            domainAway: 50,
            domainHome: 50,
            id: 0,
          }),
        )
      }
    }

    setAllMoments(momentsToGame)
  }, [gamePenalts, modeGame, momentsTheGame, params, placarMatchTrip])

  const passMinuteGame = useCallback(() => {
    const objMoment: MomentComplete = {
      ...allMoments[indexMomentCurrent],
      id: indexMomentCurrent,
    }
    let posseHome = 0
    let posseAway = 0
    if (indexMomentCurrent === 0 && params.idMatch) {
      updateMatchLive(params.idMatch, goalHome, goalAway)
    }
    setDomainHome((state) => ({ ...state, domain: objMoment.domainHome }))
    setDomainAway((state) => ({ ...state, domain: objMoment.domainAway }))
    if (objMoment.minute !== minuteGame) {
      setMinuteGame(objMoment.minute)
      if (
        objMoment.minute !== 1 &&
        objMoment.minute !== 45 &&
        objMoment.minute !== 90
      ) {
        posseAway = objMoment.domainAway
        posseHome = objMoment.domainHome
      }
    }

    if (objMoment.narracao !== '') {
      if (objMoment.homeOrAway === 'game') {
        setMomentsHighlight((state) => [...state, objMoment])
        if (objMoment.minute === 90 && objMoment.narracao.includes('Vamos')) {
          setHasPenalts(true)
        }
      } else {
        if (objMoment.penalt) {
          setMomentsHighlight((state) => [...state, objMoment])
          if (objMoment.goal && objMoment.homeOrAway === 'home') {
            setHomePenalt((state) => state + 1)
          } else if (objMoment.goal && objMoment.homeOrAway === 'away') {
            setAwayPenalt((state) => state + 1)
          }
        } else if (objMoment.goal) {
          setMomentsHighlight((state) => [...state, objMoment])
          if (objMoment.homeOrAway === 'home') {
            setGoalHome((state) => state + 1)
            if (params.idMatch) {
              updateMatchLive(params.idMatch, goalHome + 1, goalAway)
            }
          } else {
            setGoalAway((state) => state + 1)
            if (params.idMatch) {
              updateMatchLive(params.idMatch, goalHome, goalAway + 1)
            }
          }
        }
      }
      setMomentsNarration((state) => [...state, objMoment])
    }

    if (objMoment.homeOrAway === 'home') {
      setStatsHome((state) => ({
        posse: state.posse + posseHome,
        chutesBloqueado:
          state.chutesBloqueado + objMoment.stats.chutesBloqueado,
        chutesFora: state.chutesFora + objMoment.stats.chutesFora,
        chutesNoAlvo: state.chutesNoAlvo + objMoment.stats.chutesNoAlvo,
        golEsperado: state.golEsperado + objMoment.stats.golEsperado,
        qtdPenalt: state.qtdPenalt + objMoment.stats.qtdPenalt,
      }))
      setStatsAway((state) => ({
        ...state,
        posse: state.posse + posseAway,
      }))
    } else if (objMoment.homeOrAway === 'away') {
      setStatsAway((state) => ({
        posse: state.posse + posseAway,
        chutesBloqueado:
          state.chutesBloqueado + objMoment.stats.chutesBloqueado,
        chutesFora: state.chutesFora + objMoment.stats.chutesFora,
        chutesNoAlvo: state.chutesNoAlvo + objMoment.stats.chutesNoAlvo,
        golEsperado: state.golEsperado + objMoment.stats.golEsperado,
        qtdPenalt: state.qtdPenalt + objMoment.stats.qtdPenalt,
      }))
      setStatsHome((state) => ({
        ...state,
        posse: state.posse + posseHome,
      }))
    } else {
      setStatsHome((state) => ({
        ...state,
        posse: state.posse + posseHome,
      }))
      setStatsAway((state) => ({
        ...state,
        posse: state.posse + posseAway,
      }))
    }

    setIndexMomentCurrent((state) => state + 1)
  }, [
    allMoments,
    goalAway,
    goalHome,
    indexMomentCurrent,
    minuteGame,
    params.idMatch,
    updateMatchLive,
  ])

  useEffect(() => {
    const { home, away } = params
    setDomainHome({
      overrall: home.overall, // * multiHomeOverall,
      domain: 50,
      nameClube: home.name,
    })
    setDomainAway({
      overrall: away.overall,
      domain: 50,
      nameClube: away.name,
    })
    buildGame()
  }, [buildGame, params])

  useEffect(() => {
    const qtdMoments = allMoments.length
    const duration = durationMomentGame / velocityGame

    if (
      qtdMoments === 0 ||
      indexMomentCurrent < 0 ||
      indexMomentCurrent >= qtdMoments
    ) {
      return
    }

    const interval = setTimeout(() => {
      passMinuteGame()
    }, duration)

    return () => {
      clearTimeout(interval)
    }
  }, [allMoments.length, indexMomentCurrent, passMinuteGame, velocityGame])

  const listNarration = useMemo(() => {
    return [...momentsNarration].reverse()
  }, [momentsNarration])

  const listMomentsHighlight = useMemo(() => {
    return [...momentsHighlight].reverse()
  }, [momentsHighlight])

  const disabledContinue = indexMomentCurrent < allMoments.length

  return (
    <Background>
      <Container>
        <Placar
          nameCup={
            params.idMatch
              ? ''
              : params.modeGame === 'Normal'
                ? 'Amistoso'
                : 'Eliminatória'
          }
          goalHome={goalHome}
          goalAway={goalAway}
          hasPenalts={hasPenalts}
          penaltHome={homePenalt}
          penaltAway={awayPenalt}
          home={params.home}
          away={params.away}
          placarMatchTrip={placarMatchTrip}
        />

        <ContentInfo>
          <Domination
            minute={minuteGame}
            domainHome={domainHome.domain}
            domainAway={domainAway.domain}
            velocityGame={velocityGame}
            updateVelocityGame={handleUpdateVelocityGame}
          />
          <Stadium>{params.home.stadium}</Stadium>
          <ViewGame
            isMatchInCup={!!params.idMatch}
            idsClubsInMatch={[params.home.id, params.away.id]}
            listNarration={listNarration}
            listMomentsHighlight={listMomentsHighlight}
            logoAway={logoAway}
            logoHome={logoHome}
            goalAway={goalAway}
            goalHome={goalHome}
            statsAway={statsAway}
            statsHome={statsHome}
            hasPenalt={hasPenalts}
            goalPenalAway={awayPenalt}
            goalPenalHome={homePenalt}
          />
        </ContentInfo>
        <DivAction>
          <Button
            style={{ flex: 1 }}
            onPress={goBack}
            title="Voltar"
            type="Cancel"
          />
          <Button
            style={{ flex: 1 }}
            disabled={disabledContinue}
            onPress={handleFinishedMatch}
            title="Continuar"
          />
        </DivAction>
      </Container>
    </Background>
  )
}
