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

export const ActionFilter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
