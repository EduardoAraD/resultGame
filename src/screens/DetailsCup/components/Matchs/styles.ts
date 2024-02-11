import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 10px;
  flex: 1;
`

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;
`

export const Round = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
`

export const Touch = styled.TouchableOpacity`
  padding: 10px;
`
