import { getDomainMatch } from './domainMatch'

describe('Function getDomainMatch', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be response domain differente max for clubs', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)

    const domainOld = {
      home: { domain: 50, overrall: 50, nameClube: 'Club 1' },
      away: { domain: 50, overrall: 50, nameClube: 'Club 2' },
    }

    const domain = getDomainMatch(domainOld)

    expect(domain).toEqual(domainOld)
  })

  it('should be response domain max for club home', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0)

    const domainOld = {
      home: { domain: 65, overrall: 50, nameClube: 'Club 1' },
      away: { domain: 35, overrall: 50, nameClube: 'Club 2' },
    }

    const domain = getDomainMatch(domainOld)

    expect(domain).toEqual({
      home: { ...domainOld.home, domain: 85 },
      away: { ...domainOld.away, domain: 15 },
    })
  })
  it('should be response domain max for club away', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1)

    const domainOld = {
      home: { domain: 35, overrall: 50, nameClube: 'Club 1' },
      away: { domain: 65, overrall: 50, nameClube: 'Club 2' },
    }

    const domain = getDomainMatch(domainOld)

    expect(domain).toEqual({
      home: { ...domainOld.home, domain: 15 },
      away: { ...domainOld.away, domain: 85 },
    })
  })
})
