import styled from "styled-components/native";

interface ContainerProps {
  hasPenalts: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  gap: ${props => props.hasPenalts ? 0 : 6}px;
`

export const Text = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 50px;
  color: ${({ theme }) => theme.colors.white};
  width: 54px;
`

export const Line = styled.View`
  margin-top: 10px;
  height: 6px;
  width: 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContainerPenalts = styled.View`
  justify-content: center;
  align-items: center;
  gap: -12px;
`;

export const SubText = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  font-size: 22px;
  width: 23px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;
