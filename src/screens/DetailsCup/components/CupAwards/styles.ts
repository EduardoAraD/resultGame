import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 10px;
  gap: 20px;
`

export const Info = styled.View`
  /* flex-direction: row; */
  background-color: ${({ theme }) => theme.colors.gray_500};
  gap: 10px;
  border-radius: 20px;
  padding-bottom: 10px;
  overflow: hidden;
`

export const InfoChampions = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const Image = styled.Image`
  height: 100px;
  width: 100px;
  object-fit: contain;
`

export const Name = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

export const Title = styled(Name)`
  padding: 5px;
  font-family: ${({ theme }) => theme.fonts.medium};
  background-color: ${({ theme }) => theme.colors.gray_400};
`
