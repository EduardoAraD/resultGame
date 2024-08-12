import { TypeItemClassification } from '../Model/ItemClassification'

interface GetTypeItemClassificationProps {
  numberClubsPromoted: number
  numberClubsRelegated: number
  position: number
  numberClubsInClassification: number
}

export function getTypeItemClassification({
  numberClubsPromoted,
  numberClubsRelegated,
  position,
  numberClubsInClassification,
}: GetTypeItemClassificationProps): TypeItemClassification {
  const isTypePromotion = position <= numberClubsPromoted
  if (isTypePromotion) {
    return 'promotion'
  }

  const isTypeRelegation =
    position > numberClubsInClassification - numberClubsRelegated
  if (isTypeRelegation) {
    return 'relegation'
  }

  return 'standard'
}
