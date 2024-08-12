import { ClubShort } from '../../Model/Club'
import { logoClubDefault } from '../../utils/getDefaultLogoClub'

import { Card, Image, Info, Name, Title } from './styles'

interface CardClubAwardProps {
  title: string
  clubs: (ClubShort | undefined)[]
}
export function CardClubAward({ title, clubs }: CardClubAwardProps) {
  return (
    <Card testID="card">
      <Title>{title}</Title>
      {clubs.map((club, index) => (
        <Info key={`${club?.id || ''}_${index}`}>
          <Image
            source={club === undefined ? logoClubDefault : club.logo}
            alt=""
          />
          <Name>{club === undefined ? 'A definir' : club.name}</Name>
        </Info>
      ))}
    </Card>
  )
}
