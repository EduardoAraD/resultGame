export function getNarrationHoldGoalkeeper() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 25) return 'Defende com tranquilidade o goleiro.'

  if (numberRandom < 50) return 'Espalma o goleiro e a defesa tem a posse.'

  if (numberRandom < 75) return 'Segura firme o goleiro'

  return 'Nas mãos do goleiro, a bola veio direto nele'
}
