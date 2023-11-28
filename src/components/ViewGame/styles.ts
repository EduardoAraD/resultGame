import styled from "styled-components/native";

export const Content = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.gray_600};
  border-radius: 12px;
  overflow: hidden;
`;

export const DivActionGame = styled.View`
  flex-direction: row;
  width: 100%;
  height: 30px;
  border-radius: 10px;
`;

interface OptionGameProps {
  selected: boolean;
}
export const OptionGame = styled.TouchableOpacity<OptionGameProps>`
  flex: 1;
  background-color: ${props => props.selected ? props.theme.colors.green : props.theme.colors.gray_400};
  justify-content: center;
  align-items: center;
`;

export const TextOptionGame = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.white};
`;

export const Scroll = styled.ScrollView`
  margin: 10px 4px;
`;