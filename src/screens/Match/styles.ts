import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: ${Platform.OS === 'ios' ? '0' : '20'}px;
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`

export const Stadium = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`

export const ContentImage = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`

export const LogoClube = styled.Image`
  height: 75px;
  width: 75px;
  object-fit: contain;
`

export const ContentInfo = styled.View`
  margin-top: 4px;
  flex: 1;
  width: 100%;
`

export const DivAction = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 8px;
  margin-top: 20px;
`
