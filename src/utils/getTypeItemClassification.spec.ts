import { getTypeItemClassification } from './getTypeItemClassification'

describe('Function getTypeItemClassification', () => {
  it("should be return one type 'promotion'", () => {
    const type = getTypeItemClassification({
      numberClubsInClassification: 4,
      numberClubsPromoted: 1,
      numberClubsRelegated: 1,
      position: 1,
    })
    expect(type).toBe('promotion')
  })

  it("should be return one type 'standard'", () => {
    const type = getTypeItemClassification({
      numberClubsInClassification: 4,
      numberClubsPromoted: 1,
      numberClubsRelegated: 1,
      position: 2,
    })
    expect(type).toBe('standard')
  })

  it("should be return one type 'relegation'", () => {
    const type = getTypeItemClassification({
      numberClubsInClassification: 4,
      numberClubsPromoted: 1,
      numberClubsRelegated: 1,
      position: 4,
    })
    expect(type).toBe('relegation')
  })
})
