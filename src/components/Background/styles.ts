import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  background-color: ${(props) => props.theme.colors.blue_100};
  height: 100%;
  width: 100%;
`

export const Safe = styled.View`
  flex: 1;
`
