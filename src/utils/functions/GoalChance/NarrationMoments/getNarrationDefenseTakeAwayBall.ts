export function getNarrationDefenseTakeAwayBall() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 33) return 'Tira a defesa de qualquer maneira'

  if (numberRandom < 66) return 'A defesa corta e afasta o perigo'

  return 'Corta a defesa e afasta o perigo'
}
