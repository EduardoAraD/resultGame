import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: 0px;
`

export const SubTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TouchTypeCup = styled.TouchableOpacity`
  align-items: center;
`

export const TouchText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

interface ViewImageProps {
  actived: boolean
}
export const ViewImage = styled.View<ViewImageProps>`
  background-color: ${({ theme, actived }) =>
    actived ? theme.colors.green : theme.colors.gray_600};
  border-radius: 10px;
  padding: 10px;
`

export const Image = styled.Image`
  height: 100px;
  width: 100px;
  object-fit: contain;
`
