import styled from "styled-components/native";

export const Container = styled.View`
  height: 20px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.blue_200};
  border-radius: 15px;
  overflow: hidden;

  margin-bottom: 10px;
`;

export const DomainHome = styled.View`
  height: 20px;
  background-color: ${({ theme }) => theme.colors.green};
`;

export const DomainAway = styled.View`
  height: 20px;
  background-color: ${({ theme }) => theme.colors.red};
`;

export const Text = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
