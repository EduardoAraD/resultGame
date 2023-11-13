import styled from "styled-components/native";

export const Touch = styled.TouchableOpacity`
  margin-top: 18px;
  height: 48px;
  width: 100%;
  background-color: ${props => props.disabled ? props.theme.colors.gray_300 : props.theme.colors.green};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TouchText = styled.Text`
  font-size: 18px;
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;
