import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: ${Platform.OS === 'ios' ? 0 : 20}px;
`
