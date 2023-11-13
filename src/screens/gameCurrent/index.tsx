import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, ContentImage, ContentInfo, LogoClube, Safe, Title } from "./styles";
import { Placar } from "../../components/Placar";
import { MomentGame } from "../../components/MomentGame";
import { chanceDeGol } from "../../utils/chanceDeGol";
import { Moment } from "../../Model/Moment";
import { Domination } from "../../components/Domination";
import { domainGame } from "../../utils/domainGame";
import { DomainClube } from "../../Model/DomainClube";
import { Button } from "../../components/Button";
import { Clube } from "../../Model/Clube";

export interface GameCurrentProps {
  home: Clube;
  away: Clube;
}

export function GameCurrent() {
  const { navigate } = useNavigation();
  const params = useRoute().params as GameCurrentProps;

  const logoHome = params.home.logo;
  const logoAway = params.away.logo;

  const [goalHome, setGoalHome] = useState(0);
  const [goalAway, setGoalAway] = useState(0);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [momentsPrimary, setMomentsPrimary] = useState<Moment[]>([]);
  const [minute, setMinute] = useState(1);
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
        narracao: 'Início de Jogo!',
        id: 1,
      }

      setMoments([obj]);
      setMomentsPrimary([obj]);
    }
    else if(minute === 45) {
      const obj: Moment = {
        minute,
        narracao: 'Intervalo de jogo.',
        id: 9998,
      }

      setMoments(state => [...state, obj]);
      setMomentsPrimary(state => [...state, obj]);
    }
    else if(minute === 90) {
      const obj: Moment = {
        minute,
        narracao: 'Final de Jogo.',
        id: 9999,
      }

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
        const resultChance = chanceDeGol(minute, home.nameClube);

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
        const resultChance = chanceDeGol(minute, away.nameClube);

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

  useEffect(() => {
    const { home, away } = params
    setDomainHome({
      overrall: home.overall,
      domain: 50,
      nameClube: home.name,
    });
    setDomainAway({
      overrall: away.overall,
      domain: 50,
      nameClube: away.name,
    })
  }, [])

  useEffect(() => {
    if(domainHome.overrall === 0 || domainAway.overrall === 0) {
      return ;
    }
    if(minute > 90) {
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
  }, [gameStarted])

  const listMoments = useMemo(() => {
    const list = [...moments].reverse();
    [...momentsPrimary].reverse().forEach(item => {
      const has = list.find(i => i.minute === item.minute)
      if(!has) {
        list.push(item);
      }
    })

    // console.log(list)
    return list;
  }, [moments, momentsPrimary])

  const disabledContinue = minute < 90;

  return (
    <Safe>
      <Container>
        <Title>{domainHome.nameClube} x {domainAway.nameClube}</Title>
        <ContentImage>
          <LogoClube source={logoHome} />
          <Placar goalHome={goalHome} goalAway={goalAway} />
          <LogoClube source={logoAway} />
        </ContentImage>

        <ContentInfo>
          <Domination
            minute={minute - 1}
            domainHome={domainHome.domain}
            domainAway={domainAway.domain}
          />
          <Title>Melhores Momentos</Title>
          <FlatList
            data={listMoments}
            keyExtractor={item => `${item.minute}-${item.id}`}
            renderItem={({ item }) => (
              <MomentGame
                min={item.minute}
                text={item.narracao}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </ContentInfo>
        <Button disabled={disabledContinue} onPress={goHome} />
      </Container>
    </Safe>
  )
}
