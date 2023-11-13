import styled from "styled-components/native";

export const Card = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.blue_100};
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  gap: 12px;
  flex-direction: row;
  align-items: center;
`;

export const ViewImage = styled.View`
  background-color: ${props => props.theme.colors.gray_600};
  padding: 4px;
  align-self: flex-start;
`;

export const Image = styled.Image`
  height: 32px;
  width: 32px;
  object-fit: contain;
`;

export const Name = styled.Text`
  font-size: 20px;
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.white};
`;