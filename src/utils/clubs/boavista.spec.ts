import { isClubPreCreated } from '../../Model/Club'
import { boavista } from './boavista'

describe('Club Boavista', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(boavista)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
