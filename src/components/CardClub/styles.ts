import styled from 'styled-components/native'

interface ContainerProps {
  isSelected?: boolean
}

export const Card = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({ theme, isSelected, disabled }) =>
    isSelected
      ? theme.colors.blue_300
      : disabled
        ? theme.colors.gray_600
        : theme.colors.blue_200};
  border-radius: 6px;
  width: 100%;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 12px;
`

export const Image = styled.Image`
  height: 36px;
  width: 36px;
  object-fit: contain;
`

export const Name = styled.Text<ContainerProps>`
  font-size: 18px;
  font-family: ${({ theme, isSelected }) =>
    isSelected ? theme.fonts.bold : theme.fonts.regular};
  color: ${(props) => props.theme.colors.white};
`

export const Circle = styled.View<ContainerProps>`
  height: 34px;
  width: 34px;
  border-radius: 17px;
  background-color: ${(props) => props.theme.colors.blue_100};
  justify-content: center;
  align-items: center;
`

export const CircleSlow = styled.View`
  height: 26px;
  width: 26px;
  border-radius: 13px;
  background-color: ${(props) => props.theme.colors.white};
`

export const ViewCreated = styled.View`
  border-radius: 13px;
  height: 26px;
  width: 26px;
  justify-content: center;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.white};
  border-width: 2px;
`

export const TextCreated = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
`

export const TextDesabled = styled(Name)`
  font-size: 8px;
  color: ${(props) => props.theme.colors.white};
  position: absolute;
  bottom: 1px;
  right: 5px;
`
