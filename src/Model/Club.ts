import { ImageSourcePropType } from 'react-native'

import { logoClubDefault } from '../utils/getDefaultLogoClub'
import { Stadium } from './Stadium'

export interface ClubShort {
  id: string
  name: string
  logo: ImageSourcePropType
  isDisabled: boolean
  isCreatedOnUser: boolean
}

export interface ClubComplete extends ClubShort {
  acronym: string
  nameComplete: string
  overall: number
  stadium: Stadium
}

export interface ClubPreCreated {
  cod: number
  name: string
  acronym: string
  nameComplete: string
  overall: number
  stadium: Stadium
  logo: ImageSourcePropType
  // state: string
  // colors: string[]
}

export const emptyClub: ClubShort = {
  id: '',
  name: '',
  logo: logoClubDefault,
  isDisabled: false,
  isCreatedOnUser: false,
}

export const emptyClubComplete: ClubComplete = {
  ...emptyClub,
  nameComplete: '',
  acronym: '',
  overall: 0,
  stadium: {
    nameComplete: '',
  },
}

export function isClubPreCreated(
  object: ClubPreCreated,
): object is ClubPreCreated {
  return (
    'cod' in object &&
    'name' in object &&
    'acronym' in object &&
    'nameComplete' in object &&
    'overall' in object &&
    'stadium' in object &&
    'logo' in object
  )
}
