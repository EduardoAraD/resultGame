import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;

export const Text = styled.Text`
  flex: 1;
  font-size: 18px;
  font-family: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.colors.white};
`;
