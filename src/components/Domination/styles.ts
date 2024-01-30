import { CaretRight } from 'phosphor-react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
  height: 20px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.blue_200};
  border-radius: 15px;
  overflow: hidden;

  margin-bottom: 10px;
`

export const DomainHomeAnimated = styled(Animated.View)`
  height: 20px;
  background-color: ${({ theme }) => theme.colors.green};
`

export const DomainAway = styled.View`
  height: 20px;
  background-color: ${({ theme }) => theme.colors.red};
  width: 100%;
`

export const Text = styled.Text`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

export const Touch = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.blue_500};
  border-radius: 6px;
  position: absolute;
  right: 0;
  padding: 4px 8px;
  margin-top: -8px;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`

export const ContentIcon = styled.View`
  flex-direction: row;
  width: 32px;
  gap: -8px;
  align-items: center;
  justify-content: center;
`

interface IconProps {
  disable?: boolean
}

export const Icon = styled(CaretRight).attrs<IconProps>(
  ({ theme, disable }) => ({
    size: 16,
    weight: 'bold',
    color: disable ? theme.colors.gray_500 : theme.colors.white,
  }),
)``
