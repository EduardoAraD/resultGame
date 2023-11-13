import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${props => props.theme.colors.blue_200};
  margin-bottom: 4px;
  border-radius: 6px;
  flex-direction: row;
  width: 100%;
`;

export const Minute = styled.Text`
  padding: 10px 12px;
  width: 40px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.gray_700};
`;

export const Text = styled.Text`
  padding: 10px;
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;
