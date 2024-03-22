export function getNarrationWrongPass() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 33) return 'Vissh, errou o passe, a posse troca de lado.'

  if (numberRandom < 66) return 'Passe errado, a defesa retoma.'

  return 'Não passa pela defesa'
}
