import styled from 'styled-components/native'

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
`

export const Container = styled.View`
  margin-top: 40px;
  margin-bottom: 6px;
  flex-direction: row;
  justify-content: space-between;
`
