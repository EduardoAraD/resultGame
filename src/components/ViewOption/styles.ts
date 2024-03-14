import styled from 'styled-components/native'

export const Content = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.gray_600};
  border-radius: 12px;
  overflow: hidden;
`

export const DivActionGame = styled.View`
  flex-direction: row;
  width: 100%;
  height: 30px;
  border-radius: 10px;
`

interface OptionGameProps {
  selected: boolean
}
export const OptionGame = styled.TouchableOpacity<OptionGameProps>`
  flex: 1;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.green : props.theme.colors.gray_500};
  justify-content: center;
  align-items: center;
`

export const TextOptionGame = styled.Text<OptionGameProps>`
  font-family: ${({ theme, selected }) =>
    selected ? theme.fonts.bold : theme.fonts.regular};
  color: ${(props) => props.theme.colors.white};
`
