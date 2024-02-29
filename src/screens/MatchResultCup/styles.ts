import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
`

export const Content = styled.View`
  margin-top: 20px;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`

export const InfoClub = styled.View`
  align-items: center;
  gap: 10px;
`

export const Name = styled.Text`
  height: 30px;
  font-size: 24px;
  line-height: 30px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`
