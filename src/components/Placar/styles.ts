import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

interface ContainerProps {
  hasPenalts: boolean
}

export const Container = styled(Animated.View)<ContainerProps>`
  flex-direction: row;
  height: 70px;
  align-items: center;
  gap: ${(props) => (props.hasPenalts ? 0 : 6)}px;
`

export const Text = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 42px;
  color: ${({ theme }) => theme.colors.white};
  width: 48px;
`

export const Line = styled.View`
  margin-top: 10px;
  height: 6px;
  width: 12px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ContainerPenalts = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: -18px;
  gap: -12px;
`

export const SubText = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 16px;
  width: 18px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

export const ContentAnimated = styled.View`
  align-items: center;
  overflow: hidden;
`

export const ImageBack = styled.Image`
  height: 120px;
  width: 120px;
  position: absolute;
  opacity: 0.5;
  top: -10px;
`

export const DivMatchTrip = styled.View`
  flex-direction: row;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: -2px;
`
