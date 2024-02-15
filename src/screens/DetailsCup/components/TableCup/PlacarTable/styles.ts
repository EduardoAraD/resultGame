import styled from 'styled-components/native'

export const Card = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray_400};
  width: 150px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
`

export const Goal = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const Name = styled(Goal)`
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Info = styled.View`
  padding: 2px;
  flex: 1;
`

export const Placar = styled.View`
  margin-left: 1px;
  background-color: ${({ theme }) => theme.colors.blue_200};
  padding: 2px 5px;
  align-items: center;
  justify-content: space-around;
`
export const Penal = styled(Placar)`
  background-color: ${({ theme }) => theme.colors.blue_500};
`

export const ViewName = styled.View`
  flex: 1;
  justify-content: center;
  overflow: hidden;
`

export const Image = styled.Image`
  position: absolute;
  height: 50px;
  width: 50px;
  opacity: 0.2;
  align-self: flex-end;
`
