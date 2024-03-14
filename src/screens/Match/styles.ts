import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: ${Platform.OS === 'ios' ? '0' : '20'}px;
`

export const Stadium = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
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
