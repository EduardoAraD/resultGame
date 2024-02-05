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
  sigla: string
  nameComplete: string
  overall: number
  // star: number;
  // state: string
  stadium: string
  // colors: string[]
}

export interface Clube {
  id: number
  name: string
  sigla: string
  nameComplete: string
  overall: number
  // star: number;
  state: string
  stadium: string
  logo: ImageSourcePropType
  colors: string[]
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
  sigla: '',
  nameComplete: '',
  overall: 0,
  // state: '',
  stadium: '',
  logo,
  // colors: [],
  disabled: false,
  createdForUser: false,
}
