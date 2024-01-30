import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Safe = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.blue_100};
`

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  /* align-items: center; */
  gap: 10px;
  justify-content: center;
`

interface MarkText {
  marked: boolean
}

export const Text = styled.Text<MarkText>`
  text-align: center;
  font-size: 22px;
  color: ${(props) =>
    props.marked ? props.theme.colors.green : props.theme.colors.white};
  margin-top: 2px;
  font-family: ${(props) => props.theme.fonts.bold};
`
