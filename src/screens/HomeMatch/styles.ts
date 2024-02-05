import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: 0px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
