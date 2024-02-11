import styled from 'styled-components/native'

interface TouchProps {
  actived: boolean
}

export const Touch = styled.TouchableOpacity<TouchProps>`
  background-color: ${({ theme, actived }) =>
    actived ? theme.colors.blue_300 : theme.colors.blue_200};

  padding: 8px 12px;
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
  gap: 6px;
`

export const Text = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export type TypeColor = 'green' | 'white' | 'cancel'
interface BoalProps {
  type: TypeColor
}
export const Boal = styled.View<BoalProps>`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${({ theme, type }) =>
    type === 'green'
      ? theme.colors.green
      : type === 'cancel'
        ? theme.colors.red
        : theme.colors.white};
`
