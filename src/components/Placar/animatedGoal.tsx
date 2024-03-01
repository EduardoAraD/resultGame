import { PinwheelIn, SlideInUp } from 'react-native-reanimated'

import { ContentAnimated, ImageBall, TextAnimated } from './styles'
import ballPng from '../../assets/ball.png'

export function GoalAnimated() {
  return (
    <ContentAnimated entering={PinwheelIn.duration(500)}>
      <TextAnimated entering={SlideInUp.duration(500).delay(150)}>
        G
      </TextAnimated>
      <ImageBall source={ballPng} alt="" />
      <TextAnimated entering={SlideInUp.duration(500).delay(150)}>
        O
      </TextAnimated>
      <TextAnimated entering={SlideInUp.duration(500).delay(300)}>
        O
      </TextAnimated>
      <TextAnimated entering={SlideInUp.duration(500).delay(450)}>
        O
      </TextAnimated>
      <TextAnimated entering={SlideInUp.duration(500).delay(600)}>
        L
      </TextAnimated>
    </ContentAnimated>
  )
}
