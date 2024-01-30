import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

interface ContainerProps {
  hasPenalts: boolean
}

export const Container = styled(Animated.View)<ContainerProps>`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => (props.hasPenalts ? 0 : 6)}px;
`

export const Text = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 45px;
  color: ${({ theme }) => theme.colors.white};
  width: 48px;
`

export const Line = styled.View`
  margin-top: 10px;
  height: 6px;
  width: 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ContainerPenalts = styled.View`
  justify-content: center;
  align-items: center;
  gap: -12px;
`

export const SubText = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 20px;
  width: 21px;
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
