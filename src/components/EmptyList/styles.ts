import styled from 'styled-components/native'

export const View = styled.View`
  flex: 1;
  padding: 40px;
  justify-content: center;
  align-items: center;
`
export const Text = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`
