import { CodRound } from '../Model/Round'

interface GetNameRoundCupProps {
  codRound: CodRound
}

export function getNameRoundCup({ codRound }: GetNameRoundCupProps) {
  switch (codRound) {
    case 'final':
      return 'Final'
    case 'third':
      return 'Terceiro Lugar'
    case 'semi':
      return 'Semi-Final'
    case 'quarter':
      return 'Quartas de Final'
    case 'round of 16':
      return 'Oitavas de Final'
    case 'knockout stage':
      return 'Eliminatória'
    case 'stantard':
      return 'Rodada'
  }
}
