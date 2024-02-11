import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 10px;
  overflow: hidden;
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 18px;
`

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.gray_600};
  padding: 10px;
  gap: 10px;
`

export const SubTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

export const Line = styled.View`
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ContentLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Text = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.white};
`

export const ViewActionsTouch = styled.View`
  flex-direction: row;
  gap: 15px;
`

export const ValueView = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray_500};
  justify-content: center;
  align-items: center;
`

export const ValueText = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const Touch = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`

export const TouchPlus = styled(Touch)`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray_400 : theme.colors.green};
`

export const TouchMinus = styled(Touch)`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray_400 : theme.colors.red};
`
