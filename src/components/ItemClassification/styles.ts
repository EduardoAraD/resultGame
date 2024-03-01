import styled from 'styled-components/native'

import { TypeItemClassification } from '../../Model/ItemClassification'

interface ContentProps {
  actived: boolean
}

export const Content = styled.View<ContentProps>`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme, actived }) =>
    actived ? theme.colors.blue_300 : 'none'};
`

interface LineProps {
  type: TypeItemClassification
}

export const Line = styled.View<LineProps>`
  height: 100%;
  width: 4px;
  background-color: ${({ theme, type }) =>
    type === 'Promotion'
      ? theme.colors.green
      : type === 'Relegation'
        ? theme.colors.red
        : theme.colors.gray_300};
`

export const Image = styled.Image`
  height: 26px;
  width: 26px;
  object-fit: contain;
`

export const Name = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
`

export const Info = styled.View`
  flex-direction: row;
  gap: 6px;
  padding: 8px 4px;
`

export const Text = styled.Text`
  font-size: 14px;
  text-align: center;
  width: 22px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`

export const Pos = styled(Text)`
  font-size: 18px;
  width: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
`
