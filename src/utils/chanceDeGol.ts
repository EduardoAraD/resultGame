import { Moment } from '../Model/Moment'
import { emptyStats } from '../Model/Stats'

// export function chanceDeGol(
//   minute: number,
//   homeOrAway: 'home' | 'away',
//   nameClube: string,
// ) {
//   const goalDeClube = `Gooooooooll do ${nameClube}`
//   const momentsNow: Moment[] = []

//   const numberRandom = Math.floor(Math.random() * 100)
//   if (numberRandom < 20) {
//     const obj: Moment = {
//       minute,
//       narracao: `O ${nameClube} chega ao ataque, mas é parado pela defesa.`,
//       homeOrAway,
//       stats: emptyStats,
//     }
//     momentsNow.push(obj)
//   } else if (numberRandom > 50) {
//     const obj: Moment = {
//       minute,
//       narracao: `O ${nameClube} chega ao ataque, acha um espaço e busca o arremate.`,
//       homeOrAway,
//       stats: emptyStats,
//     }
//     momentsNow.push(obj)

//     const numberRandom2 = Math.floor(Math.random() * 100)
//     if (numberRandom2 < 40) {
//       const obj: Moment = {
//         minute,
//         narracao: `Mas a defesa chega para bloquear o chute.`,
//         homeOrAway,
//         stats: {
//           ...emptyStats,
//           chutesBloqueado: 1,
//         },
//       }
//       momentsNow.push(obj)
//     } else {
//       // 85 - 100
//       if (numberRandom2 > 85) {
//         const obj: Moment = {
//           minute,
//           narracao: `O atacante chuta no gol.`,
//           homeOrAway,
//           stats: emptyStats,
//         }
//         momentsNow.push(obj)

//         const numberRandom3 = Math.floor(Math.random() * 100)
//         if (numberRandom3 > 50) {
//           const obj: Moment = {
//             minute,
//             narracao: goalDeClube,
//             goal: true,
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesNoAlvo: 1,
//               golEsperado: 0.5,
//             },
//           }
//           momentsNow.push(obj)
//         } else if (numberRandom3 > 30) {
//           const obj: Moment = {
//             minute,
//             narracao: 'Chutou mal, chutou para fora.',
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesFora: 1,
//               golEsperado: 0.5,
//             },
//           }
//           momentsNow.push(obj)
//         } else {
//           const obj: Moment = {
//             minute,
//             narracao: `Espalma goleiro e a defesa corta.`,
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesNoAlvo: 1,
//               golEsperado: 0.5,
//             },
//           }
//           momentsNow.push(obj)
//         }
//       } else {
//         // 40 - 85
//         const obj: Moment = {
//           minute,
//           narracao: `O jogador chuta de fora da área.`,
//           homeOrAway,
//           stats: emptyStats,
//         }
//         momentsNow.push(obj)

//         const numberRandom3 = Math.floor(Math.random() * 100)
//         if (numberRandom3 < 40) {
//           const obj: Moment = {
//             minute,
//             narracao: `Chuta longe do gol.`,
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesFora: 1,
//               golEsperado: 0.05,
//             },
//           }
//           momentsNow.push(obj)
//         } else if (numberRandom3 < 70) {
//           const obj: Moment = {
//             minute,
//             narracao: `O goleiro espalma para longe.`,
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesNoAlvo: 1,
//               golEsperado: 0.05,
//             },
//           }
//           momentsNow.push(obj)
//         } else if (numberRandom3 <= 95) {
//           const obj: Moment = {
//             minute,
//             narracao: `O goleiro espalma mal para dentro da área.`,
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesNoAlvo: 1,
//               golEsperado: 0.05,
//             },
//           }
//           momentsNow.push(obj)

//           const numberRandom4 = Math.floor(Math.random() * 100)
//           if (numberRandom4 <= 30) {
//             const obj: Moment = {
//               minute,
//               narracao: `O zagueiro corta a bola pra longe.`,
//               homeOrAway,
//               stats: emptyStats,
//             }
//             momentsNow.push(obj)
//           } else {
//             const obj: Moment = {
//               minute,
//               narracao: `O atacante chuta o rebote.`,
//               homeOrAway,
//               stats: emptyStats,
//             }
//             momentsNow.push(obj)

//             const numberRandom5 = Math.floor(Math.random() * 100)
//             if (numberRandom5 < 60) {
//               const obj: Moment = {
//                 minute,
//                 narracao: goalDeClube,
//                 goal: true,
//                 homeOrAway,
//                 stats: {
//                   ...emptyStats,
//                   chutesNoAlvo: 1,
//                   golEsperado: 0.6,
//                 },
//               }
//               momentsNow.push(obj)
//             } else if (numberRandom5 < 65) {
//               const obj: Moment = {
//                 minute,
//                 narracao: 'Perdeu!!! Inacreditável o gol que perde.',
//                 homeOrAway,
//                 stats: {
//                   ...emptyStats,
//                   chutesFora: 1,
//                   golEsperado: 0.6,
//                 },
//               }
//               momentsNow.push(obj)
//             } else if (numberRandom5 < 85) {
//               const obj: Moment = {
//                 minute,
//                 narracao: `O zagueiro bloqueia o chute e a bola sai.`,
//                 homeOrAway,
//                 stats: {
//                   ...emptyStats,
//                   chutesBloqueado: 1,
//                   golEsperado: 0.6,
//                 },
//               }
//               momentsNow.push(obj)
//             } else {
//               const obj: Moment = {
//                 minute,
//                 narracao: `Defesa do goleiro. Ele conseguiu se recurerar a tempo.`,
//                 homeOrAway,
//                 stats: {
//                   ...emptyStats,
//                   chutesNoAlvo: 1,
//                   golEsperado: 0.6,
//                 },
//               }
//               momentsNow.push(obj)
//             }
//           }
//         } else {
//           const obj: Moment = {
//             minute,
//             narracao: `Goooooooolaço do ${nameClube}.`,
//             goal: true,
//             homeOrAway,
//             stats: {
//               ...emptyStats,
//               chutesNoAlvo: 1,
//               golEsperado: 0.05,
//             },
//           }
//           momentsNow.push(obj)
//         }
//       }
//     }
//   } else {
//     const obj: Moment = {
//       minute,
//       narracao: `O ${nameClube} mantém a posse de bola.`,
//       homeOrAway,
//       stats: emptyStats,
//     }
//     momentsNow.push(obj)
//   }

//   return momentsNow
// }

export function chanceDeGolPenalt(
  overallClub: number,
  overallAll: number,
  nameClube: string,
  homeOrAway: 'home' | 'away',
  numberOfPenalt: number,
) {
  const moments: Moment[] = []

  const momentInicio: Moment = {
    minute: 90,
    narracao: `${nameClube} para sua ${numberOfPenalt}° cobrança`,
    homeOrAway,
    stats: emptyStats,
  }
  moments.push(momentInicio)

  const golPorcentage = (overallClub / overallAll) * 100
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom > golPorcentage) {
    const moment: Moment = {
      minute: 90,
      narracao: 'Perdeu o Penalti',
      penalt: true,
      homeOrAway,
      stats: {
        ...emptyStats,
        qtdPenalt: 1,
      },
    }
    moments.push(moment)
  } else {
    const moment: Moment = {
      minute: 90,
      narracao: `Gol de Penalti`,
      goal: true,
      penalt: true,
      homeOrAway,
      stats: {
        ...emptyStats,
        qtdPenalt: 1,
      },
    }
    moments.push(moment)
  }

  return moments
}
