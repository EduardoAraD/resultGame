import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Modal = styled(Animated.View)`
  width: ${Dimensions.get('screen').width}px;
  height: 112%;
  top: 0;
  right: 0;
  z-index: 5;
`

export const Content = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #000000cc;
`

export const ViewContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
