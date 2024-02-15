export function getNameRoundCup(
  round: number,
  maxRound: number,
  hasThirdPlace: boolean,
) {
  switch (round) {
    case maxRound:
      return 'Final'
    case maxRound - 1:
      return hasThirdPlace ? 'Terceiro Lugar' : 'Semi-Final'
    case maxRound - 2:
      return hasThirdPlace ? 'Semi-Final' : 'Quartas de Final'
    case maxRound - 3:
      return hasThirdPlace ? 'Quartas de Final' : 'Oitavas de Final'
    case maxRound - 4:
      return hasThirdPlace
        ? 'Oitavas de Final'
        : `Eliminatória ${maxRound - round + 1}`
    default:
      return `Eliminatória ${maxRound - round + 1}`
  }
}
