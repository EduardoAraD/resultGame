import { CaretLeft } from 'phosphor-react-native'
import styled from 'styled-components/native'

export const Content = styled.View`
  height: 48px;
  justify-content: center;
  margin-top: -10px;
`

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 20px;
  width: 70%;
  align-self: center;
  text-align: center;
`

export const TouchBack = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  position: absolute;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`

export const IconBack = styled.Image`
  height: 32px;
  width: 32px;
  fill: ${({ theme }) => theme.colors.white};
`
