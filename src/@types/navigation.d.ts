import { GameCurrentProps } from '../screens/gameCurrent'

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      game: GameCurrentProps
    }
  }
}
