import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  padding-bottom: 0px;
`

export const Content = styled.View`
  padding-top: 30px;
  align-items: center;
  padding-bottom: 30px;
`

export const ViewImage = styled.View`
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.blue_200};
`

export const Image = styled.Image`
  height: 180px;
  width: 180px;
  object-fit: contain;
`

export const Info = styled.View`
  margin-top: 30px;
  width: 100%;
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const Overrall = styled(Title)`
  margin: 30px;
`

export const ViewOver = styled.View`
  min-height: 100px;
  min-width: 100px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

export const TextOver = styled(Title)`
  font-size: 64px;
`

export const Actions = styled.View`
  flex-direction: row;
  gap: 20px;
  margin-top: 40px;
`
