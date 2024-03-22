export function getNarrationDefenseGoalkeeper() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 33) return 'Defendeeeeu goleiro. Que incrível.'

  if (numberRandom < 66) return 'Goleeeeiro faz milagre e espalma a bola.'

  return 'Defendeu!! O goleiro faz a ponte para defender.'
}
