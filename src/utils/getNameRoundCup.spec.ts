import { getNameRoundCup } from './getNameRoundCup'

const FINAL = 'Final'
const THIRD_PLACE = 'Terceiro Lugar'
const SEMI_FINAL = 'Semi-Final'
const QUARTER = 'Quartas de Final'
const ROUND_16 = 'Oitavas de Final'
const KNOCKOUT = 'Eliminatória'
const STANTARD = 'Rodada'

describe('Function getNameRoundCup', () => {
  it("should be return round name 'Final'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'final',
    })
    expect(nameRound).toBe(FINAL)
  })
  it("should be return round name 'Terceiro Lugar'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'third',
    })
    expect(nameRound).toBe(THIRD_PLACE)
  })
  it("should be return round name 'Semi'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'semi',
    })
    expect(nameRound).toBe(SEMI_FINAL)
  })
  it("should be return round name 'Quartas'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'quarter',
    })
    expect(nameRound).toBe(QUARTER)
  })
  it("should be return round name 'Oitavas'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'round of 16',
    })
    expect(nameRound).toBe(ROUND_16)
  })
  it("should be return round name 'Eliminatória'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'knockout stage',
    })
    expect(nameRound).toBe(KNOCKOUT)
  })
  it("should be return round name 'Rodada'", () => {
    const nameRound = getNameRoundCup({
      codRound: 'stantard',
    })
    expect(nameRound).toBe(STANTARD)
  })
})
