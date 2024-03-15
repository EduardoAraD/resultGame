import { emptyStats } from '../Model/Stats'
import { getClassification } from './getClassification'
import { logoDefault } from './getDefaultLogoClub'

describe('Function getClassification', () => {
  it('should be one list order of clubs by number points', () => {
    const club1 = {
      id: '0',
      name: 'Club test 1',
      logo: logoDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club2 = {
      id: '1',
      name: 'Club test 2',
      logo: logoDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club3 = {
      id: '2',
      name: 'Club test 3',
      logo: logoDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club4 = {
      id: '3',
      name: 'Club test 4',
      logo: logoDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const classification = getClassification({
      matchsOfSeason: [
        {
          home: club1,
          away: club2,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: { ...emptyStats, goal: 1 },
            awayStats: emptyStats,
          },
        },
        {
          home: club2,
          away: club1,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: { ...emptyStats, goal: 1 },
            awayStats: { ...emptyStats, goal: 1 },
          },
        },
        {
          home: club3,
          away: club1,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: { ...emptyStats, goal: 1 },
            awayStats: { ...emptyStats, goal: 2 },
          },
        },
        {
          home: club3,
          away: club1,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: { ...emptyStats, goal: 1 },
            awayStats: { ...emptyStats, goal: 1 },
          },
        },
        {
          home: club2,
          away: club3,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: { ...emptyStats, goal: 1 },
            awayStats: { ...emptyStats, goal: 1 },
          },
        },
        {
          home: club3,
          away: club2,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: { ...emptyStats, goal: 1 },
            awayStats: { ...emptyStats, goal: 1 },
          },
        },
        {
          home: club1,
          away: club4,
          stats: {
            id: '',
            type: 'standard',
            status: 'finished',
            homeStats: emptyStats,
            awayStats: { ...emptyStats, goal: 3 },
          },
        },
      ],
      clubs: [club1, club2, club3, club4],
      points: {
        win: 3,
        draw: 1,
        loss: 0,
      },
    })

    expect(classification.length).toBe(4)
    expect(classification).toEqual([
      expect.objectContaining({ points: 8, club: club1 }),
      expect.objectContaining({ points: 3, club: club4 }),
      expect.objectContaining({ points: 3, club: club3 }),
      expect.objectContaining({ points: 3, club: club2 }),
    ])
  })
})
