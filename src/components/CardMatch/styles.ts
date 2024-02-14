import styled from 'styled-components/native'

export const Card = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ViewName = styled.View`
  height: 44px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  flex: 1;
  overflow: hidden;
`

export const Name = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const Placar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 0.8;
`

export const Line = styled.View`
  height: 2px;
  width: 6px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const Penal = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`

export const Goal = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  width: 26px;
`

export const Image = styled.Image`
  height: 110px;
  width: 110px;
  position: absolute;
  opacity: 0.2;
  top: -25px;
`

export const TextGoalMult = styled(Penal)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
  width: 16px;
`
