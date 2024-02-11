import { Platform } from 'react-native'
import { Trash } from 'phosphor-react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: ${Platform.OS === 'ios' ? 0 : 20}px;
`

export const ViewRemove = styled.View`
  background-color: ${({ theme }) => theme.colors.red};
  justify-content: center;
  align-items: center;
  width: 90px;
  border-radius: 6px;
`

export const IconTrash = styled(Trash).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: 28,
}))``
