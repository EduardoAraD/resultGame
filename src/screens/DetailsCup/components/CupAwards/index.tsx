import { useMemo } from 'react'
import { ScrollView } from 'react-native'

import { useCup } from '../../../../hook/useCup'

import { ClubShort } from '../../../../Model/Club'
import { emptyMatchStats } from '../../../../Model/Match'
import { CardClubAward } from '../../../../components/CardClubAward'

import { getWinnerClubInMatch } from '../../../../utils/getClubWinnerInMatch'

import { Container, Image, Info, InfoChampions, Name, Title } from './styles'
import cupImg from '../../../../assets/trophy_cup.png'
import leagueImg from '../../../../assets/trophy_league.png'
import defaultLogo from '../../../../assets/logos/escudo_cinza.png'

export function CupAwards() {
  const {
    cup: {
      type,
      numberClubs,
      hasThirdPlace,
      status,
      numberClubsPromoted,
      numberClubsRelegated,
    },
    getClassificationInLeague,
    rounds,
  } = useCup()

  const { first, secund, third, promotions, relegations } = useMemo((): {
    first: ClubShort | undefined
    secund: ClubShort | undefined
    third: ClubShort | undefined
    promotions: (ClubShort | undefined)[]
    relegations: (ClubShort | undefined)[]
  } => {
    const classification = getClassificationInLeague()

    if (type === 'League' && status === 'closed') {
      let first: ClubShort | undefined
      let secund: ClubShort | undefined
      let third: ClubShort | undefined
      if (classification.length > 0) {
        first = classification[0].club
      }
      if (classification.length > 1) {
        secund = classification[1].club
      }
      if (classification.length > 2) {
        third = classification[2].club
      }
      return {
        first,
        secund,
        third,
        promotions: classification
          .slice(0, numberClubsPromoted)
          .map((i) => i.club),
        relegations: classification
          .slice(-numberClubsRelegated)
          .map((i) => i.club),
      }
    } else if (type === 'Cup') {
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
      if (hasThirdPlace) {
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
    getClassificationInLeague,
    hasThirdPlace,
    numberClubsPromoted,
    numberClubsRelegated,
    rounds,
    status,
    type,
  ])

  return (
    <ScrollView>
      <Container>
        <Info>
          <Title>Grande Campeão</Title>
          <InfoChampions>
            <Image source={type === 'Cup' ? cupImg : leagueImg} alt="" />
            <Image
              source={first === undefined ? defaultLogo : first.logo}
              alt=""
            />
          </InfoChampions>
          <Name>{first === undefined ? 'A definir' : first.name}</Name>
        </Info>
        <CardClubAward title="Vice campeão" clubs={[secund]} />
        {!(!hasThirdPlace && type === 'Cup') && numberClubs > 2 && (
          <CardClubAward title="Terceiro lugar" clubs={[third]} />
        )}
        {type === 'League' && (
          <>
            <CardClubAward title="Clubes promovidos" clubs={promotions} />
            <CardClubAward title="Clubes rebeixados" clubs={relegations} />
          </>
        )}
      </Container>
    </ScrollView>
  )
}
