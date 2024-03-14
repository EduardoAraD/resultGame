import { ImageSourcePropType } from 'react-native'

import logo from '../assets/logos/escudo_cinza.png'

export interface ClubShort {
  id: string
  name: string
  logo: ImageSourcePropType
  disabled: boolean
  createdForUser: boolean
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
  id: '0',
  name: '',
  logo,
  disabled: false,
  createdForUser: false,
}

export const emptyClubComplete: ClubComplete = {
  id: '0',
  name: '',
  acronym: '',
  nameComplete: '',
  overall: 0,
  stadium: '',
  logo,
  disabled: false,
  createdForUser: false,
}
