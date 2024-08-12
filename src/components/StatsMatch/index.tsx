import { ImageSourcePropType } from 'react-native'

import { Stats } from '../../Model/Stats'
import { ItemStats } from '../ItemStats'

import { Container, Content, DivLogos, LogoAway, LogoHome } from './styles'

interface InfoStatsLogo {
  logo: ImageSourcePropType
  stats: Stats
}

interface StatsMatchProps {
  homeInfo: InfoStatsLogo
  awayInfo: InfoStatsLogo
  hasPenalt: boolean
  showGoal?: boolean
  showLogos?: boolean
}

function getPossessionInMatch({
  possession,
  possessionAll,
}: {
  possession: number
  possessionAll: number
}) {
  return ((possession / possessionAll) * 100).toFixed(1)
}

export function StatsMatch({
  homeInfo,
  awayInfo,
  hasPenalt,
  showGoal = true,
  showLogos = true,
}: StatsMatchProps) {
  const allKicksHome =
    homeInfo.stats.shotsBlocked +
    homeInfo.stats.shotsOnGoal +
    homeInfo.stats.shotsOut
  const allKicksAway =
    awayInfo.stats.shotsBlocked +
    awayInfo.stats.shotsOnGoal +
    awayInfo.stats.shotsOut

  const efficiencyKickInClubHome =
    homeInfo.stats.goal === 0 ? 0 : (homeInfo.stats.goal / allKicksHome) * 100
  const efficiencyKickInClubAway =
    awayInfo.stats.goal === 0 ? 0 : (awayInfo.stats.goal / allKicksAway) * 100
  const efficiencyPenaltyInClubHome =
    homeInfo.stats.goalPenalty === 0
      ? 0
      : (homeInfo.stats.goalPenalty / homeInfo.stats.numberPenalties) * 100
  const efficiencyPenaltyInClubAway =
    awayInfo.stats.goalPenalty === 0
      ? 0
      : (awayInfo.stats.goalPenalty / awayInfo.stats.numberPenalties) * 100

  const possessionAll = homeInfo.stats.possession + awayInfo.stats.possession
  const possessionClubHome = getPossessionInMatch({
    possession: homeInfo.stats.possession,
    possessionAll,
  })
  const possessionClubAway = getPossessionInMatch({
    possession: awayInfo.stats.possession,
    possessionAll,
  })

  return (
    <Container>
      {showLogos && (
        <DivLogos testID="logos">
          <LogoHome source={homeInfo.logo} />
          <LogoAway source={awayInfo.logo} />
        </DivLogos>
      )}
      <Content>
        {showGoal && (
          <ItemStats
            title="Gols"
            valueHome={String(homeInfo.stats.goal)}
            valueAway={String(awayInfo.stats.goal)}
          />
        )}
        <ItemStats
          title="Posse de Bola"
          valueHome={`${possessionClubHome}%`}
          valueAway={`${possessionClubAway}%`}
        />
        <ItemStats
          title="Finalizações"
          valueHome={String(allKicksHome)}
          valueAway={String(allKicksAway)}
        />
        <ItemStats
          title="Finalizações para Fora"
          valueHome={String(homeInfo.stats.shotsOut)}
          valueAway={String(awayInfo.stats.shotsOut)}
        />
        <ItemStats
          title="Finalizações Bloqueadas"
          valueHome={String(homeInfo.stats.shotsBlocked)}
          valueAway={String(awayInfo.stats.shotsBlocked)}
        />
        <ItemStats
          title="Finalizações no Gol"
          valueHome={String(homeInfo.stats.shotsOnGoal)}
          valueAway={String(awayInfo.stats.shotsOnGoal)}
        />
        <ItemStats
          title="Eficiência nas finalizações"
          valueHome={efficiencyKickInClubHome.toFixed(1) + '%'}
          valueAway={efficiencyKickInClubAway.toFixed(1) + '%'}
        />
        <ItemStats
          title="Gol esperado (xG)"
          valueHome={String(homeInfo.stats.expectedGoal.toFixed(1))}
          valueAway={String(awayInfo.stats.expectedGoal.toFixed(1))}
        />
        {hasPenalt && (
          <>
            <ItemStats
              title="Gols de penaltis"
              valueHome={String(homeInfo.stats.goalPenalty)}
              valueAway={String(awayInfo.stats.goalPenalty)}
            />
            <ItemStats
              title="Penaltis cobrados"
              valueHome={String(homeInfo.stats.numberPenalties)}
              valueAway={String(awayInfo.stats.numberPenalties)}
            />
            <ItemStats
              title="Eficiência em Penaltis"
              valueHome={efficiencyPenaltyInClubHome.toFixed(0) + '%'}
              valueAway={efficiencyPenaltyInClubAway.toFixed(0) + '%'}
            />
          </>
        )}
      </Content>
    </Container>
  )
}
