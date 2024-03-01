import styled from 'styled-components/native'

import { TypeItemClassification } from '../../Model/ItemClassification'

export const Container = styled.View`
  padding: 10px;
  flex: 1;
`

export const Border = styled.View`
  border-radius: 10px;
  overflow: hidden;
`

export const Content = styled.View`
  flex-direction: row;
  padding: 4px;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.blue_200};
`

export const Text = styled.Text`
  font-size: 10px;
  text-align: center;
  width: 22px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const ViewPoint = styled.View`
  flex-direction: row;
  gap: 6px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`

interface PointProps {
  type: TypeItemClassification
}
export const Point = styled.View<PointProps>`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: ${({ theme, type }) =>
    type === 'Promotion'
      ? theme.colors.green
      : type === 'Relegation'
        ? theme.colors.red
        : theme.colors.gray_300};
`

export const TextPoint = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`
