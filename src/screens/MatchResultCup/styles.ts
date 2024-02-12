import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  margin-bottom: 40px;
`

export const Stadium = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.white};
`

export const InfoClub = styled.View`
  align-items: center;
  gap: 10px;
`

export const CardMatch = styled.View`
  align-items: center;
  margin-top: 80px;
`

export const Game = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 20px;
  overflow: hidden;
`

export const VS = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.white};
  line-height: 16px;
`

interface ViewClubeProps {
  position: 'flex-start' | 'flex-end'
}

export const ViewClube = styled.View<ViewClubeProps>`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  align-self: ${(props) => props.position};
`

export const Name = styled.Text`
  height: 30px;
  font-size: 24px;
  line-height: 30px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const Opacity = styled.View`
  position: absolute;
  margin-top: -25px;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  width: 140%;
  opacity: 0.3;
`

export const LogoMatch = styled.Image`
  height: 200px;
  width: 200px;
  object-fit: contain;
`

export const InfoMatch = styled.View`
  padding: 10px 30px;
  gap: 10px;
`

export const Placar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const Goal = styled.Text`
  font-size: 64px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`
