import { ImageSourcePropType } from 'react-native'

import { Stats } from '../../Model/Stats'
import { ItemStats } from '../ItemStats'

import { Container, Content, DivLogos, LogoAway, LogoHome } from './styles'

interface StatsGameProps {
  goalHome: number
  goalAway: number
  statsHome: Stats
  statsAway: Stats
  logoHome: ImageSourcePropType
  logoAway: ImageSourcePropType
  hasPenalt: boolean
  goalPenalHome: number
  goalPenalAway: number
  showGoal?: boolean
  showLogos?: boolean
}

export function StatsGame({
  logoHome,
  logoAway,
  goalAway,
  goalHome,
  statsAway,
  statsHome,
  goalPenalAway,
  goalPenalHome,
  hasPenalt,
  showGoal = true,
  showLogos = true,
}: StatsGameProps) {
  const chutesHome =
    statsHome.chutesBloqueado + statsHome.chutesFora + statsHome.chutesNoAlvo
  const chutesAway =
    statsAway.chutesBloqueado + statsAway.chutesFora + statsAway.chutesNoAlvo

  const efficiencyHome = goalHome === 0 ? 0 : (goalHome / chutesHome) * 100
  const efficiencyAway = goalAway === 0 ? 0 : (goalAway / chutesAway) * 100
  const efficiencyPenaltHome =
    goalPenalHome === 0 ? 0 : (goalPenalHome / statsHome.qtdPenalt) * 100
  const efficiencyPenaltAway =
    goalPenalAway === 0 ? 0 : (goalPenalAway / statsAway.qtdPenalt) * 100

  const posseTotal = statsHome.posse + statsAway.posse
  const posseHome = ((statsHome.posse / posseTotal) * 100).toFixed(1)
  const posseAway = ((statsAway.posse / posseTotal) * 100).toFixed(1)

  return (
    <Container>
      {showLogos && (
        <DivLogos>
          <LogoHome source={logoHome} />
          <LogoAway source={logoAway} />
        </DivLogos>
      )}
      <Content>
        {showGoal && (
          <ItemStats
            title="Gols"
            valueHome={String(goalHome)}
            valueAway={String(goalAway)}
          />
        )}
        <ItemStats
          title="Posse de Bola"
          valueHome={`${posseHome}%`}
          valueAway={`${posseAway}%`}
        />
        <ItemStats
          title="Finalizações"
          valueHome={String(chutesHome)}
          valueAway={String(chutesAway)}
        />
        <ItemStats
          title="Finalizações para Fora"
          valueHome={String(statsHome.chutesFora)}
          valueAway={String(statsAway.chutesFora)}
        />
        <ItemStats
          title="Finalizações Bloqueadas"
          valueHome={String(statsHome.chutesBloqueado)}
          valueAway={String(statsAway.chutesBloqueado)}
        />
        <ItemStats
          title="Finalizações no Gol"
          valueHome={String(statsHome.chutesNoAlvo)}
          valueAway={String(statsAway.chutesNoAlvo)}
        />
        <ItemStats
          title="Eficiência"
          valueHome={efficiencyHome.toFixed(1) + '%'}
          valueAway={efficiencyAway.toFixed(1) + '%'}
        />
        <ItemStats
          title="Gol esperado (xG)"
          valueHome={String(statsHome.golEsperado.toFixed(1))}
          valueAway={String(statsAway.golEsperado.toFixed(1))}
        />
        {hasPenalt && (
          <>
            <ItemStats
              title="Penalts"
              valueHome={String(statsHome.qtdPenalt)}
              valueAway={String(statsAway.qtdPenalt)}
            />
            <ItemStats
              title="Eficiência em Penalts"
              valueHome={efficiencyPenaltHome.toFixed(0) + '%'}
              valueAway={efficiencyPenaltAway.toFixed(0) + '%'}
            />
          </>
        )}
      </Content>
    </Container>
  )
}
