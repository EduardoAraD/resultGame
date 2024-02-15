import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { MatchRoutesNavigationProps } from '../../routes/routes/match.routes'
import { useMatch } from '../../hook/useMatch'

import { ClubComplete } from '../../Model/Club'
import { DomainClube } from '../../Model/DomainClub'
import { ModeMatch } from '../../Model/ModeMatch'
import { Moment, MomentComplete } from '../../Model/Moment'
import { Stats, emptyStats } from '../../Model/Stats'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { Domination } from '../../components/Domination'
import { Placar } from '../../components/Placar'
import { ViewGame } from '../../components/ViewGame'

import { chanceDeGol, chanceDeGolPenalt } from '../../utils/chanceDeGol'
import { domainGame } from '../../utils/domainGame'

import {
  Container,
  ContentImage,
  ContentInfo,
  DivAction,
  LogoClube,
  Stadium,
  Title,
} from './styles'

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
      await updateStatsMatch({
        id: idMatch,
        goalHome,
        goalAway,
        goalHomePenal: homePenalt,
        goalAwayPenal: awayPenalt,
        type: modeGame,
        status: 'finished',
      })

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
    ): {
      domHome: DomainClube
      domAway: DomainClube
      moments: Moment[]
    } => {
      if (min === 1) {
        const newMoment: Moment = {
          minute: min,
          narracao: 'Início de Jogo.',
          homeOrAway: 'game',
          stats: emptyStats,
        }
        return {
          domHome: { ...domHome, domain: 50 },
          domAway: { ...domAway, domain: 50 },
          moments: [newMoment],
        }
      }
      if (min === 45) {
        const newMoment: Moment = {
          minute: min,
          narracao: 'Intervalo de jogo.',
          homeOrAway: 'game',
          stats: emptyStats,
        }
        return {
          domHome: { ...domHome, domain: 50 },
          domAway: { ...domAway, domain: 50 },
          moments: [newMoment],
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
        const newMoment: Moment = {
          minute: min,
          narracao: notIsFinal ? 'Vamos para os Penaltis' : 'Final de Jogo.',
          homeOrAway: 'game',
          stats: emptyStats,
        }
        return {
          domHome: { ...domHome, domain: 50 },
          domAway: { ...domAway, domain: 50 },
          moments: [newMoment],
        }
      } else {
        const { home, away } = domainGame({
          home: domHome,
          away: domAway,
        })

        if (home.domain >= 70 || away.domain >= 70) {
          const howClubAttack = home.domain >= 70 ? 'home' : 'away'
          const nameClub = home.domain >= 70 ? home.nameClube : away.nameClube
          const resultChance = chanceDeGol(min, howClubAttack, nameClub)

          return {
            domHome: { ...home },
            domAway: { ...away },
            moments: resultChance,
          }
        }

        const newMoment: Moment = {
          minute: min,
          narracao: '',
          homeOrAway: 'game',
          stats: emptyStats,
        }
        return {
          domHome: { ...home },
          domAway: { ...away },
          moments: [newMoment],
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

    arrayMinutes.forEach((_, indexMinute) => {
      const minuteNow = indexMinute + 1
      const { domAway, domHome, moments } = momentsTheGame(
        minuteNow,
        domainHomeClub,
        domainAwayClub,
        goalHomeClub,
        goalAwayClub,
      )

      domainHomeClub.domain = domHome.domain
      domainAwayClub.domain = domAway.domain
      moments.forEach((mon) =>
        momentsToGame.push({
          ...mon,
          domainAway: domAway.domain,
          domainHome: domHome.domain,
          id: 0,
        }),
      )

      const momentGoal = moments.find((i) => i.goal)
      if (momentGoal) {
        if (momentGoal.homeOrAway === 'home') {
          goalHomeClub += 1
        } else {
          goalAwayClub += 1
        }

        const newMoment: MomentComplete = {
          domainAway: 50,
          domainHome: 50,
          minute: momentGoal.minute,
          id: 0,
          narracao: `Agora está ${goalHomeClub}x${goalAwayClub} no placar!`,
          homeOrAway: momentGoal.homeOrAway,
          stats: emptyStats,
        }

        domainHomeClub.domain = 50
        domainAwayClub.domain = 50
        momentsToGame.push(newMoment)
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
    // const statsAwayMinute: Stats = emptyStats;
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
          } else {
            setGoalAway((state) => state + 1)
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
  }, [allMoments, indexMomentCurrent, minuteGame])

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
        <Title>
          {domainHome.nameClube} x {domainAway.nameClube}
        </Title>
        <ContentImage>
          <LogoClube source={logoHome} />
          <Placar
            goalHome={goalHome}
            goalAway={goalAway}
            hasPenalts={hasPenalts}
            penaltHome={homePenalt}
            penaltAway={awayPenalt}
            logoAway={logoAway}
            logoHome={logoHome}
            placarMatchTrip={placarMatchTrip}
          />
          <LogoClube source={logoAway} />
        </ContentImage>

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
