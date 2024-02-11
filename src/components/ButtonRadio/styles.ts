import styled from 'styled-components/native'

export const Touch = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.gray_400};
  justify-content: center;
  align-items: center;
  border-color: ${(props) => props.theme.colors.gray_100};
  border-width: 1px;
`

export const Circle = styled.View`
  height: 18px;
  width: 18px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.gray_100};
`
