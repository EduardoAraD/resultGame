import { ImageSourcePropType } from "react-native";

import logo from '../assets/logos/escudo_cinza.png';

export interface Clube {
  name: string;
  overall: number;
  star: number;
  stadium: string;
  logo: ImageSourcePropType;
}

export const emptyClub: Clube = {
  name: '',
  overall: 0,
  star: 0,
  stadium: '',
  logo,
}
