export interface Moment {
  minute: number;
  narracao: string;
  goal?: boolean;
  penalt?: boolean;
  homeOrAway: 'home' | 'away' | 'game'
  id: number;
}