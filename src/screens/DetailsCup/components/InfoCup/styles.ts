import styled from 'styled-components/native'

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_600};
  padding: 10px;
  gap: 10px;
`

export const SubTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

export const Line = styled.View`
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ContentLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Text = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`

export const ValueView = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_500};
  justify-content: center;
  align-items: center;
`

export const ValueText = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.bold};
`
