import { isClubPreCreated } from '../../Model/Club'
import { jacuipense } from './jacuipense'

describe('Club Jacuipense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(jacuipense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
