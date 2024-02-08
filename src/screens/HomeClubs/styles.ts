import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: 0px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
`

export const Actions = styled.View`
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

interface TouchProps {
  selected: boolean
}

export const Touch = styled.TouchableOpacity<TouchProps>`
  padding: 10px;
  border-radius: 999px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.green : theme.colors.blue_200};
`
