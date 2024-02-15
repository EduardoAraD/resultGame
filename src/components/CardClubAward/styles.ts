import styled from 'styled-components/native'

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 10px;
  overflow: hidden;
`

const TextBase = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`

export const Title = styled(TextBase)`
  background-color: ${({ theme }) => theme.colors.gray_400};
  padding: 5px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
`

export const Info = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
`

export const Image = styled.Image`
  height: 36px;
  width: 36px;
  object-fit: contain;
`

export const Name = styled(TextBase)`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
`
