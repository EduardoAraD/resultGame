import styled from 'styled-components/native'

export const Touch = styled.TouchableOpacity`
  height: 72px;
  width: 72px;
  position: absolute;
  right: 20px;
  bottom: 30px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.green};
  justify-content: center;
  align-items: center;
`
