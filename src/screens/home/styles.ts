import styled from "styled-components/native";

export const Safe = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.blue_100};
`;

export const Container = styled.View`
  padding: 20px;
  flex: 1;
  align-items: center;
  gap: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;

export const DivClubes = styled.View`
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
  justify-content: space-between;
`;

export const ButtonClube = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${props => props.theme.colors.blue_200};
  align-items: center;
  border-radius: 10px;
  max-width: 45%;
  width: 100%;
  overflow: hidden;
  gap: 10px;
`;

export const LogoClube = styled.Image`
  height: 120px;
  width: 120px;
  object-fit: contain;
`;

export const NameClube = styled.Text`
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
  color: ${props => props.theme.colors.white};
  text-align: center;
`;

export const Info = styled.View`
  margin-top: 18px;
  width: 100%;
  align-items: center;
`;

export const Staduim = styled.Text`
  margin-top: 20px;
  font-size: 20px;
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;

export const Game = styled.View`
  width: 100%;
  align-items: center;
`;

export const VS = styled.Text`
  font-size: 16px;
  padding: 10px;
  font-family: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.colors.white};
`;

interface ViewClubeProps {
  position: 'flex-start' | 'flex-end'
}

export const ViewClube = styled.View<ViewClubeProps>`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  align-self: ${props => props.position};
`;

export const Name = styled.Text`
  font-size: 28px;
  font-family: ${props => props.theme.fonts.bold};
  color: ${props => props.theme.colors.white};
`;

export const Logo = styled.Image`
  height: 48px;
  width: 48px;
  object-fit: contain;
`;

