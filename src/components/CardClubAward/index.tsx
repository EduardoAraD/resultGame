import { ClubShort } from '../../Model/Club'

import { Card, Image, Info, Name, Title } from './styles'
import logo from '../../assets/logos/escudo_cinza.png'

interface CardClubAwardProps {
  title: string
  club: ClubShort | undefined
}
export function CardClubAward({ title, club }: CardClubAwardProps) {
  return (
    <Card>
      <Title>{title}</Title>
      <Info>
        <Image source={club === undefined ? logo : club.logo} alt="" />
        <Name>{club === undefined ? 'A definir' : club.name}</Name>
      </Info>
    </Card>
  )
}
