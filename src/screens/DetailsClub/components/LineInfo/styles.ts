import styled from 'styled-components/native'

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 6px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`
