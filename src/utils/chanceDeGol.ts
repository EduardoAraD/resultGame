import { Moment } from "../Model/Moment";

export function chanceDeGol(
  minute: number,
  nameClube: string,
) {
  const goalDeClube = `Gooooooooll do ${nameClube}`;
  const momentsNow: Moment[] = [];

  const numberRandom = Math.floor(Math.random() * 100);
  if(numberRandom < 20) {
    const obj: Moment = {
      minute,
      narracao: `O ${nameClube} chega ao ataque, mas a zaga corta.`,
      id: 1
    }
    momentsNow.push(obj);
  }
  else if(numberRandom > 50) {
    const obj: Moment = {
      minute,
      narracao: `O ${nameClube} chega ao ataque, acha um espaço e busca o arremate.`,
      id: 2
    }
    momentsNow.push(obj);

    const numberRandom2 = Math.floor(Math.random() * 100);
    if(numberRandom2 < 40) {
      const obj: Moment = {
        minute,
        narracao: `Mas a zaga chega para bloquear o chute.`,
        id: 3
      }
      momentsNow.push(obj);
    } else {
      // 40 - 100
      if(numberRandom2 > 85) {
        const obj: Moment = {
          minute,
          narracao: `O atacante chuta no gol.`,
          id: 4
        }
        momentsNow.push(obj);

        const numberRandom3 = Math.floor(Math.random() * 100);
        if(numberRandom3 > 60) {
          const obj: Moment = {
            minute,
            narracao: goalDeClube,
            id: 5,
            goal: true,
          }
          momentsNow.push(obj);
        } else {
          const obj: Moment = {
            minute,
            narracao: `Espalma goleiro e a zaga corta.`,
            id: 6
          }
          momentsNow.push(obj);
        }
      } else {
        // 40 - 85
        const obj: Moment = {
          minute,
          narracao: `O jogador chuta de fora da área.`,
          id: 7
        }
        momentsNow.push(obj);

        const numberRandom3 = Math.floor(Math.random() * 100);
        if(numberRandom3 < 40) {
          const obj: Moment = {
            minute,
            narracao: `Chuta longe do gol.`,
            id: 8
          }
          momentsNow.push(obj);
        } else if(numberRandom3 < 70) {
          const obj: Moment = {
            minute,
            narracao: `O goleiro espalma para longe.`,
            id: 9
          }
          momentsNow.push(obj);
        } else if(numberRandom3 <= 95) {
          const obj: Moment = {
            minute,
            narracao: `O goleiro espalma para dentro da área.`,
            id: 10
          }
          momentsNow.push(obj);
          
          const numberRandom4 = Math.floor(Math.random() * 100);
          if(numberRandom4 <= 30) {
            const obj: Moment = {
              minute,
              narracao: `O zagueiro corta a bola pra longe.`,
              id: 11
            }
            momentsNow.push(obj);
          } else {
            const obj: Moment = {
              minute,
              narracao: `O atacante chuta o rebote.`,
              id: 12
            }
            momentsNow.push(obj);

            const numberRandom5 = Math.floor(Math.random() * 100);
            if(numberRandom5 < 60) {
              const obj: Moment = {
                minute,
                narracao: goalDeClube,
                id: 13,
                goal: true,
              }
              momentsNow.push(obj);
            } else if( numberRandom5 < 85) {
              const obj: Moment = {
                minute,
                narracao: `O zagueiro bloqueia o chute e a bola sai.`,
                id: 14
              }
              momentsNow.push(obj);
            } else {
              const obj: Moment = {
                minute,
                narracao: `Defesa do goleiro. Ele conseguiu se recurerar a tempo.`,
                id: 15
              }
              momentsNow.push(obj);
            }
          }
        } else {
          const obj: Moment = {
            minute,
            narracao: `Goooooooolaço do ${nameClube}.`,
            goal: true,
            id: 16
          }
          momentsNow.push(obj);
        }
      }
    }
  } else {
    const obj: Moment = {
      minute,
      narracao: `O ${nameClube} mantém a posse de bola.`,
      id: 15
    }
    momentsNow.push(obj);
  }

  return momentsNow;
}