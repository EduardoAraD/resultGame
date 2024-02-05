import styled from 'styled-components/native'

export type ButtonTypeColor = 'Primary' | 'Secundary' | 'Cancel'
interface TouchProps {
  type: ButtonTypeColor
}

export const Touch = styled.TouchableOpacity<TouchProps>`
  height: 50px;
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
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) =>
    props.type === 'Secundary'
      ? props.theme.colors.gray_700
      : props.theme.colors.white};
`
