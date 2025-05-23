import styled from 'styled-components/native'

import { StatusCup } from '../../Model/Status'

export const Card = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.blue_200};
`
interface LineProps {
  status: StatusCup
}
export const Line = styled.View<LineProps>`
  height: 100%;
  width: 10px;
  background-color: ${({ theme, status }) =>
    status === 'start'
      ? theme.colors.green
      : status === 'progress'
        ? theme.colors.white
        : theme.colors.red};
`

export const Content = styled.View`
  padding: 10px;
  flex-direction: row;
  gap: 10px;
`

export const Image = styled.Image`
  height: 60px;
  width: 60px;
  object-fit: contain;
`

export const Info = styled.View`
  justify-content: space-between;
`

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
`
