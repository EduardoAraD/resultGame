import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 40px;
`

export const Image = styled.Image`
  height: 300px;
  width: 300px;
  object-fit: contain;
`

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 100px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.bold};
`
