export function getNarrationBallGoalkeeper() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 50) return 'Goleiro segura a bola e alivia a defesa'

  return 'O goleiro se antecipa e segura a bola'
}
