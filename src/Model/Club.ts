import { ImageSourcePropType } from 'react-native'

import { logoClubDefault } from '../utils/getDefaultLogoClub'

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
  stadium: string
}

export interface ClubPreCreated {
  cod: number
  name: string
  acronym: string
  nameComplete: string
  overall: number
  // state: string
  stadium: string
  logo: ImageSourcePropType
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
  stadium: '',
}
