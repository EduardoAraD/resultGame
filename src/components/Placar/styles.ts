import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`

export const ContentNameCup = styled.View`
  background-color: ${({ theme }) => theme.colors.blue_500};
  min-width: 200px;
  border-radius: 20px;
  justify-content: center;
  padding: 2px 10px;
  padding-bottom: 20px;
  margin-bottom: -18px;
  z-index: 1;
`

export const Content = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.gray_400};
  border-radius: 15px;
  overflow: hidden;
  z-index: 2;
`

export const ContentAnimated = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
`

export const ImageBall = styled.Image`
  height: 32px;
  width: 32px;
`

export const TextAnimated = styled(Animated.Text)`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 30px;
  color: ${({ theme }) => theme.colors.white};
`

export const ViewName = styled.View`
  height: 44px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  flex: 1;
  overflow: hidden;
`

export const Name = styled(Animated.Text)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const Image = styled.Image`
  height: 110px;
  width: 110px;
  position: absolute;
  opacity: 0.3;
  top: -25px;
`

export const Opacity = styled.View`
  position: absolute;
  margin-top: -15px;
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

export const ContentPlacar = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 0px 4px;
`

export const Line = styled.View`
  height: 4px;
  width: 6px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.gray_700};
`

export const Goal = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.gray_700};
  width: 28px;
`

export const ContentMatchTrip = styled(Animated.View)`
  background-color: ${({ theme }) => theme.colors.blue_500};
  flex-direction: row;
  border-radius: 20px;
  align-items: center;
  gap: 6px;
  padding: 0px 10px;
  padding-top: 20px;
  margin-top: -22px;
  z-index: 1;
`

export const Text = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export const TextPlacarTrip = styled(Text)`
  width: 28px;
`

export const TextName = styled(Text)`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`
