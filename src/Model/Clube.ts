import { ImageSourcePropType } from "react-native";

import logo from '../assets/logos/escudo_cinza.png';

export interface Clube {
  id: number;
  name: string;
  sigla: string;
  nameComplete: string;
  overall: number;
  // star: number;
  state: string;
  stadium: string;
  logo: ImageSourcePropType;
  colors: string[]
}

export const emptyClub: Clube = {
  id: 0,
  name: '',
  sigla: '',
  nameComplete: '',
  overall: 0,
  state: '',
  stadium: '',
  logo,
  colors: [],
}
