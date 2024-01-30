import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.gray_600};
  border-radius: 12px;
  flex: 1;
  padding: 10px 4px;
`

export const Text = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${(props) => props.theme.colors.white};
  margin-top: 6px;
  font-family: ${(props) => props.theme.fonts.bold};
`

export const Bool = styled.View`
  height: 54px;
  width: 54px;
  background-color: ${(props) => props.theme.colors.blue_200};
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  /* elevation: 10; */
  align-self: center;
`

export const Minute = styled.Text`
  font-size: 28px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.medium};
`

export const Line = styled.View`
  width: 4px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.gray_300};
  align-self: center;
`

export const LineHor = styled.View`
  width: 60px;
  height: 4px;
  background-color: ${(props) => props.theme.colors.gray_100};
  align-self: center;
  margin: -1px;
`

export const ContainerMoment = styled.View`
  flex-direction: row;
`

export const MomentInfo = styled.View`
  gap: -2px;
  flex: 1;
`

export const ViewPlacar = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-top: 14px;
`

export const TextPlacar = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.medium};
`

export const Bold = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
`

export const TextGol = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray_100};
  text-align: center;
  font-family: ${(props) => props.theme.fonts.regular};
  align-self: center;
`

export const ContentIntervalo = styled.View`
  width: 210px;
  align-self: center;
  border: ${(props) => props.theme.colors.blue_200};
  border-width: 0px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  justify-content: center;
  align-items: center;
  padding: 4px;
`
