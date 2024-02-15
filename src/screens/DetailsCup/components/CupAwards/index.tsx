import { ScrollView } from 'react-native'

import { ClubShort } from '../../../../Model/Club'
import { TypeCup } from '../../../../Model/Cup'
import { CardClubAward } from '../../../../components/CardClubAward'

import { Container, Image, Info, InfoChampions, Name, Title } from './styles'
import cupImg from '../../../../assets/trophy_cup.png'
import leagueImg from '../../../../assets/trophy_league.png'
import defaultLogo from '../../../../assets/logos/escudo_cinza.png'

interface CupAwardsProps {
  typeCup: TypeCup
  champions: ClubShort | undefined
  secund: ClubShort | undefined
  third: ClubShort | undefined
  hasThirdPlace: boolean
  numberClubs: number
}

export function CupAwards({
  typeCup,
  champions,
  secund,
  third,
  hasThirdPlace,
  numberClubs,
}: CupAwardsProps) {
  return (
    <ScrollView>
      <Container>
        <Info>
          <Title>Grande Campeão</Title>
          <InfoChampions>
            <Image source={typeCup === 'Cup' ? cupImg : leagueImg} alt="" />
            <Image
              source={champions === undefined ? defaultLogo : champions.logo}
              alt=""
            />
          </InfoChampions>
          <Name>{champions === undefined ? 'A definir' : champions.name}</Name>
        </Info>
        <CardClubAward title="Vice campeão" club={secund} />
        {!(!hasThirdPlace && typeCup === 'Cup') && numberClubs > 2 && (
          <CardClubAward title="Terceiro lugar" club={third} />
        )}
      </Container>
    </ScrollView>
  )
}
