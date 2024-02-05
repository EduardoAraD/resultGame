import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #00000055;
  padding: 40px 0px;
`

export const ModalView = styled.View`
  margin: 20px;
  background-color: ${(props) => props.theme.colors.gray_600};
  flex: 1;
  width: 80%;
  border-radius: 16px;
  overflow: hidden;
`

export const CloseButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.red};
  border-radius: 6px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`

export const Line = styled.View`
  height: 3px;
  width: 100px;
  /* background-color: ${(props) => props.theme.colors.gray_300}; */
  margin: 3px;
  align-self: center;
`

export const Input = styled.TextInput`
  height: 40px;
  margin: 10px;
  margin-top: 20px;
  padding: 4px 10px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;

  color: ${(props) => props.theme.colors.gray_700};
  font-family: ${(props) => props.theme.fonts.medium};
`
