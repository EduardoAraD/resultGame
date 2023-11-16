import styled from "styled-components/native";

export const Safe = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.blue_100};
`;

export const Container = styled.View`
  margin-top: 40px;
  padding: 20px;
  flex: 1;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.colors.white};
  text-align: center;
`;

export const ContentImage = styled.View`
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

export const LogoClube = styled.Image`
  height: 75px;
  width: 75px;
  object-fit: contain;
`;

export const ContentInfo = styled.View`
  margin-top: 30px;
  flex: 1;
  width: 100%;
`;
