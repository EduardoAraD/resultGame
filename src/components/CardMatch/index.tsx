import { TouchableOpacityProps } from 'react-native'

import { MatchComplete } from '../../Model/Match'

import {
  Card,
  Goal,
  Image,
  Line,
  Name,
  Penal,
  Placar,
  ViewName,
} from './styles'

interface CardMatchProps extends TouchableOpacityProps {
  match: MatchComplete
}

export function CardMatch({ match, ...rest }: CardMatchProps) {
  return (
    <Card activeOpacity={0.7} {...rest}>
      <ViewName>
        <Image source={match.home.logo} alt="" style={{ left: 0 }} />
        <Name numberOfLines={2}>{match.home.name}</Name>
      </ViewName>
      <Placar>
        {match.status === 'start' ? (
          <Line />
        ) : (
          <>
            <Goal style={{ textAlign: 'right' }}>{match.goalHome}</Goal>
            {match.type === 'Mata-Mata' && <Penal>{match.goalHomePenal}</Penal>}
            <Line />
            {match.type === 'Mata-Mata' && <Penal>{match.goalAwayPenal}</Penal>}
            <Goal style={{ textAlign: 'left' }}>{match.goalAway}</Goal>
          </>
        )}
      </Placar>
      <ViewName>
        <Name numberOfLines={2}>{match.away.name}</Name>
        <Image source={match.away.logo} alt="" style={{ right: 0 }} />
      </ViewName>
    </Card>
  )
}
