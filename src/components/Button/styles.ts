import styled from 'styled-components/native'

export type ButtonTypeColor = 'Primary' | 'Secundary' | 'Cancel'
interface TouchProps {
  type: ButtonTypeColor
}

export const Touch = styled.TouchableOpacity<TouchProps>`
  margin-top: 18px;
  height: 48px;
  width: 100%;
  background-color: ${(props) =>
    props.type === 'Primary'
      ? props.disabled
        ? props.theme.colors.gray_300
        : props.theme.colors.green
      : props.type === 'Secundary'
        ? props.disabled
          ? props.theme.colors.gray_300
          : props.theme.colors.white
        : props.disabled
          ? props.theme.colors.gray_300
          : props.theme.colors.red};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

export const TouchText = styled.Text<TouchProps>`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) =>
    props.type === 'Secundary'
      ? props.theme.colors.gray_700
      : props.theme.colors.white};
`
