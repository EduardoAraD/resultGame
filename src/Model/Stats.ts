export interface Stats {
  posse: number
  chutesNoAlvo: number
  chutesBloqueado: number
  chutesFora: number
  golEsperado: number
  qtdPenalt: number
}

export const emptyStats: Stats = {
  posse: 50,
  chutesFora: 0,
  chutesBloqueado: 0,
  chutesNoAlvo: 0,
  golEsperado: 0,
  qtdPenalt: 0,
}
