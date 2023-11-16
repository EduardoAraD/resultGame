import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, ContentImage, ContentInfo, LogoClube, Safe, Title } from "./styles";
import { Placar } from "../../components/Placar";
import { MomentGame } from "../../components/MomentGame";
import { chanceDeGol, chanceDeGolPenalt } from "../../utils/chanceDeGol";
import { Moment } from "../../Model/Moment";
import { Domination } from "../../components/Domination";
import { domainGame } from "../../utils/domainGame";
import { DomainClube } from "../../Model/DomainClube";
import { Button } from "../../components/Button";
import { Clube } from "../../Model/Clube";
import { ModeGame } from "../../Model/ModeGame";
import { MomentsGame } from "../../components/MomentsGame";

export interface GameCurrentProps {
  home: Clube;
  away: Clube;
  modeGame: ModeGame
}

export function GameCurrent() {
  const { navigate } = useNavigation();
  const params = useRoute().params as GameCurrentProps;

  const logoHome = params.home.logo;
  const logoAway = params.away.logo;
  const { modeGame } = params

  const [goalHome, setGoalHome] = useState(0);
  const [goalAway, setGoalAway] = useState(0);
  const [homePenalt, setHomePenalt] = useState(0);
  const [awayPenalt, setAwayPenalt] = useState(0);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [momentsPrimary, setMomentsPrimary] = useState<Moment[]>([]);
  const [momentsPenalt, setMomentsPenalt] = useState<Moment[]>([]);
  const [minute, setMinute] = useState(1);
  const [minutesCurrentPenal, setMinutesCurrentPenal] = useState(0);
  const [minutesMomentPenal, setMinutesMomentPenal] = useState(0);
  const [domainHome, setDomainHome] = useState<DomainClube>({
    domain: 50,
    overrall: 0,
    nameClube: ''
  })
  const [domainAway, setDomainAway] = useState<DomainClube>({
    domain: 50,
    overrall: 0,
    nameClube: ''
  })

  function goHome() {
    navigate('home')
  }

  const gameStarted = useCallback(async () => {
    // console.log(domainHome.domain, domainAway.domain, 'DOMATION ------');
    if(minute === 1) {
      const obj: Moment = {
        minute,
        narracao: 'Início de Jogo.',
        id: 1,
        homeOrAway: 'game',
      }

      setMoments([obj]);
      setMomentsPrimary([obj]);
    }
    else if(minute === 45) {
      const obj: Moment = {
        minute,
        narracao: 'Intervalo de jogo.',
        id: 9998,
        homeOrAway: 'game',
      }

      setDomainHome(state => ({...state, domain: 50 }))
      setDomainAway(state => ({...state, domain: 50 }))

      setMoments(state => [...state, obj]);
      setMomentsPrimary(state => [...state, obj]);
    }
    else if(minute === 90) {
      const notIsFinal = modeGame !== 'Normal' && goalHome === goalAway;
      const obj: Moment = {
        minute,
        narracao: notIsFinal ? 'Vamos para os Penaltis' : 'Final de Jogo.',
        id: 9999,
        homeOrAway: 'game',
      }

      setDomainHome(state => ({...state, domain: 50 }))
      setDomainAway(state => ({...state, domain: 50 }))
      setMoments(state => [...state, obj]);
      setMomentsPrimary(state => [...state, obj]);
    } else {
      const { home, away } = domainGame({
        home: domainHome,
        away: domainAway,
      });

      setDomainHome(home);
      setDomainAway(away);

      if(home.domain >= 70) {
        const resultChance = chanceDeGol(minute, 'home', home.nameClube);

        setMoments(resultChance)
        const hasGoal = resultChance.find(i => i.goal);
        if(hasGoal) {
          setGoalHome(state => state + 1);
          setDomainHome({ ...home, domain: 45 });
          setDomainAway({ ...away, domain: 55 });
          setMomentsPrimary(state => [...state, hasGoal])
        }
      }
      else if(away.domain >= 70) {
        const resultChance = chanceDeGol(minute, 'away', away.nameClube);

        setMoments(resultChance)
        const hasGoal = resultChance.find(i => i.goal);
        if(hasGoal) {
          setGoalAway(state => state + 1)
          setDomainHome({ ...home, domain: 55 });
          setDomainAway({ ...away, domain: 45 });
          setMomentsPrimary(state => [...state, hasGoal]);
        }
      }
    }

    setMinute(minute + 1)
  }, [minute, domainHome, domainAway]);

  function PenaltsOver(
    goalPenalHome: number, RemainingPenalHome: number,
    goalPenalAway: number, RemainingPenalAway: number): boolean{
    return goalPenalAway > RemainingPenalHome + goalPenalHome ||
      goalPenalHome > RemainingPenalAway + goalPenalAway;
  }

  const gamePenalts = useCallback(async () => {
    const numberPenalt = 5;
    let momentsPen: Moment[] = [];
    const overrallHome = params.home.overall;
    let homeGoalPen = 0;
    const overrallAway = params.away.overall;
    let awayGoalPen = 0;
    const overrallAllClub = overrallHome + overrallAway;
    let itsOver = false;

    const arrayNumberPenalt = Array.from({ length: numberPenalt });
    // cobranças iniciais
    arrayNumberPenalt.forEach((_, i) => {
      if(!itsOver) {
        const penaltHomeMoment = chanceDeGolPenalt(
          overrallHome,
          overrallAllClub,
          domainHome.nameClube,
          'home',
          i + 1,
        );
        momentsPen = [...momentsPen, ...penaltHomeMoment];

        const hasHomeGoal = penaltHomeMoment.find(i => i.goal);
        homeGoalPen = homeGoalPen + (hasHomeGoal ? 1 : 0)
        if(PenaltsOver(homeGoalPen, numberPenalt - (i + 1), awayGoalPen, numberPenalt - i)) {
          itsOver = true;
        }

        if(!itsOver) {
          const penaltAwayMoment = chanceDeGolPenalt(
            overrallAway,
            overrallAllClub,
            domainAway.nameClube,
            'away',
            i + 1,
          );
          momentsPen = [...momentsPen, ...penaltAwayMoment];

          const hasAwayGoal = penaltAwayMoment.find(i => i.goal);
          awayGoalPen = awayGoalPen + (hasAwayGoal ? 1 : 0);
          if(PenaltsOver(homeGoalPen, numberPenalt - (i + 1), awayGoalPen, numberPenalt - (i + 1) )) {
            itsOver = true;
          }
        }
      }
    });

    let numberAlternadas = 1
    if(homeGoalPen === awayGoalPen) {
      // Alternadas
      while(homeGoalPen === awayGoalPen) {
        const penaltHomeMoment = chanceDeGolPenalt(
          overrallHome,
          overrallAllClub,
          domainHome.nameClube,
          'home',
          numberPenalt + numberAlternadas
        );
        momentsPen = [...momentsPen, ...penaltHomeMoment];

        const hasHomeGoal = penaltHomeMoment.find(i => i.goal);
        homeGoalPen = homeGoalPen + (hasHomeGoal ? 1 : 0);

        const penaltAwayMoment = chanceDeGolPenalt(
          overrallAway,
          overrallAllClub,
          domainAway.nameClube,
          'away',
          numberPenalt + numberAlternadas
        );
        momentsPen = [...momentsPen, ...penaltAwayMoment];

        const hasAwayGoal = penaltAwayMoment.find(i => i.goal);
        awayGoalPen = awayGoalPen + (hasAwayGoal ? 1 : 0);

        numberAlternadas = numberAlternadas + 1
      }
    }

    const objFinal: Moment = {
      minute: 90,
      id: 9912,
      narracao: 'Final de jogo.',
      homeOrAway: 'game',
    } 
    momentsPen.push(objFinal)

    setMomentsPenalt(momentsPen);
    setMinutesMomentPenal(momentsPen.length);
  }, [params.home.overall, params.away.overall, domainHome.nameClube, domainAway.nameClube])

  const passMinutPenal = useCallback(async () => {
    const momentPen = momentsPenalt[minutesCurrentPenal];
    const objMomentPen = {
      ...momentPen,
      minute: 91 + minutesCurrentPenal
    }

    setMoments([objMomentPen]);
    if(momentPen.homeOrAway === 'game') {
      setMomentsPrimary(state => [...state, objMomentPen]);
    }
    if(momentPen.penalt) {
      setMomentsPrimary(state => [...state, objMomentPen]);
    }
    if(momentPen.goal) {
      if(momentPen.homeOrAway === 'home') {
        setHomePenalt(state => state + 1);
      } else {
        setAwayPenalt(state => state + 1);
      }
    }
    setMinutesCurrentPenal(state => state + 1);
  }, [momentsPenalt, minutesCurrentPenal])

  useEffect(() => {
    const { home, away } = params
    const multiHomeOverall = modeGame === 'Mata-Mata' ? 1 : 1.1;
    // console.log(home.overall, home.overall * multiHomeOverall);
    setDomainHome({
      overrall: home.overall, // * multiHomeOverall,
      domain: 50,
      nameClube: home.name,
    });
    setDomainAway({
      overrall: away.overall,
      domain: 50,
      nameClube: away.name,
    })
  }, [params, modeGame])

  useEffect(() => {
    if(domainHome.overrall === 0 || domainAway.overrall === 0) {
      return ;
    }
    if(minute > 90) {
      setMoments([]);
      return;
    }

    // setMoments([]);
    // gameStarted()

    const interval = setTimeout(() => {
      setMoments([]);
      gameStarted()
    }, 1000)

    return () => {
      clearTimeout(interval)
    }
  }, [gameStarted]);

  useEffect(() => {
    const aggratedGoalHome = goalHome;
    const aggratedGoalAway = goalAway;
    
    if(
      minute >= 90 &&
      (aggratedGoalHome === aggratedGoalAway) &&
      modeGame !== 'Normal'
    ) {
      gamePenalts()
    }
  }, [goalHome, goalAway, minute, modeGame, gamePenalts]);

  useEffect(() => {
    if(minutesMomentPenal === 0) {
      return;
    }
    if(minutesCurrentPenal >= minutesMomentPenal) {
      setMoments([]);
      return;
    }

    const interval = setTimeout(() => {
      passMinutPenal();
    }, 1000)

    return () => {
      clearTimeout(interval)
    }
  }, [passMinutPenal, minutesMomentPenal, minutesCurrentPenal])

  const listMoments = useMemo(() => {
    return [...moments].reverse();
  }, [moments, momentsPrimary])

  const listMomentsPrimary = useMemo(() => {
    return [...momentsPrimary].reverse();
  }, [momentsPrimary])

  const disabledContinue = minute < 90;
  const hasPenalts = modeGame !== 'Normal' && minute >= 90 && goalHome === goalAway;

  return (
    <Safe>
      <Container>
        <Title>{domainHome.nameClube} x {domainAway.nameClube}</Title>
        <ContentImage>
          <LogoClube source={logoHome} />
          <Placar
            goalHome={goalHome}
            goalAway={goalAway}
            hasPenalts={hasPenalts}
            penaltHome={homePenalt}
            penaltAway={awayPenalt}
          />
          <LogoClube source={logoAway} />
        </ContentImage>

        <ContentInfo>
          <Domination
            minute={minute - 1}
            domainHome={domainHome.domain}
            domainAway={domainAway.domain}
          />
          <Title>Melhores Momentos</Title>
          <ScrollView>
            {listMoments.map(item => (
              <MomentGame
                key={`${item.minute}-${item.id}`}
                min={item.minute}
                text={item.narracao}
              />
            ))}
            <MomentsGame
              moments={listMomentsPrimary}
            />
          </ScrollView>
        </ContentInfo>
        <Button disabled={disabledContinue} onPress={goHome} />
      </Container>
    </Safe>
  )
}
