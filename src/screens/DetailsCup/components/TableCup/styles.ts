import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  gap: 20px;
`

export const Content = styled.View`
  align-items: center;
  gap: 20px;
`

interface MatchsProps {
  disableFlex: boolean
}
export const Matchs = styled.View<MatchsProps>`
  flex: ${({ disableFlex }) => (disableFlex ? 0 : 1)};
  justify-content: space-around;
  gap: 10px;
`

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

interface TouchProps {
  actived: boolean
}
export const Touch = styled.TouchableOpacity<TouchProps>`
  padding: 4px;
  align-items: center;
  border-radius: 6px;
  width: 150px;
  background-color: ${({ theme, actived }) =>
    actived ? theme.colors.green : theme.colors.gray_400};
`
