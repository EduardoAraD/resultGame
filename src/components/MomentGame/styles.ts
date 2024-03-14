import styled from 'styled-components/native'

interface ContainerProps {
  isPrimary: boolean
}

export const Container = styled.View<ContainerProps>`
  background-color: ${(props) =>
    props.isPrimary
      ? props.theme.colors.blue_300
      : props.theme.colors.blue_200};
  margin-bottom: 4px;
  border-radius: 6px;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`

export const Minute = styled.Text`
  padding: 8px;
  width: 45px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.gray_700};
`

export const Text = styled.Text`
  padding: 8px;
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${(props) => props.theme.colors.white};
`

export const Logo = styled.Image`
  height: 80px;
  width: 80px;
  position: absolute;
  opacity: 0.7;
  top: -10px;
  right: 10px;
`
