import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'

interface GetMomentsInCurrentScoreboardProps {
  minute: number
  nameClub: string
  homeOrAway: 'home' | 'away'
  goalHome: number
  goalAway: number
}

export function getMomentInAfterGoal({
  minute,
  nameClub,
  homeOrAway,
  goalAway,
  goalHome,
}: GetMomentsInCurrentScoreboardProps): MomentComplete {
  function getNarrationWithDiffGoal(diffGoal: number) {
    const messageScoreboard = `${goalHome}x${goalAway} no placar!`
    switch (diffGoal) {
      case 0:
        return `E agora está tudo empatado. ${messageScoreboard}`
      case 1:
        return `O ${nameClub} está na frente. ${messageScoreboard}`
      case -1:
        return `A ventagem cai para um gol. ${messageScoreboard}`
      case 2:
        return `O ${nameClub} aumenta a vantegem. ${messageScoreboard}`
      default: {
        if (diffGoal >= 3) {
          return `Já é goleada. O ${nameClub} faz ${messageScoreboard}`
        }
        return `O ${nameClub} diminui. ${messageScoreboard}`
      }
    }
  }

  const diff = homeOrAway === 'home' ? goalHome - goalAway : goalAway - goalHome

  const message = getNarrationWithDiffGoal(diff)

  const moment: MomentComplete = {
    minute,
    narration: message,
    homeOrAway,
    stats: emptyStats,
    domainAway: 50,
    domainHome: 50,
    id: 0,
  }

  return moment
}
