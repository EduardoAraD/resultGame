import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

export const Text = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 50px;
  color: ${({ theme }) => theme.colors.white};
  width: 54px;
`

export const Line = styled.View`
  margin-top: 10px;
  height: 8px;
  width: 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;
