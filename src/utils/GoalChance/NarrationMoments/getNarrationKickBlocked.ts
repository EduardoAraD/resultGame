export function getNarrationKickBlocked() {
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 50) return 'A defesa bloqueia o chutee afasta o perigo.'

  return 'Bloqueado pela defesa.'
}
