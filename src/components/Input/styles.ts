import styled from 'styled-components/native'

export const Container = styled.View`
  margin-bottom: 10px;
`

export const TextInput = styled.TextInput`
  padding: 16px;
  background-color: ${({ theme, editable }) =>
    editable ? theme.colors.blue_200 : `${theme.colors.blue_200}66`};
  border-radius: 10px;
  border-width: 2px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`

export const Text = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.red};
`
