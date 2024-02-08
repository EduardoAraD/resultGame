import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: 0px;
`

export const Content = styled.View`
  gap: 10px;
`

export const ContentInput = styled.View``

export const TouchImage = styled.TouchableOpacity`
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme, disabled }) =>
    disabled ? `${theme.colors.blue_200}99` : theme.colors.blue_200};
  align-self: center;
  margin-bottom: 30px;
`

export const Image = styled.Image`
  height: 180px;
  width: 180px;
  object-fit: contain;
`

export const Text = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.red};
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 20px;
`

export const ActionsOverrall = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Touch = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
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

export const ViewOver = styled.View`
  height: 100px;
  min-width: 100px;
  padding-right: 6px;
  padding-left: 6px;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

export const TextOver = styled(Title)`
  font-size: 64px;
  padding: 0px;
`
