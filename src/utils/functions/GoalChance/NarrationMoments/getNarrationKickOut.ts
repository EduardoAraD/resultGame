export function getNarrationKickOut() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 25) return 'Muito Longe, tiro de meta para o goleiro.'

  if (numberRandom < 50) return 'Raspa a trave e vai para fora.'

  if (numberRandom < 75)
    return 'Para fooora. Incrível a oportunidade que perde.'

  return 'Para fooora, que perigo essa bola.'
}
