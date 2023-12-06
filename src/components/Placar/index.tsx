// import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import {
  Container,
  ContainerPenalts,
  Line,
  SubText,
  Text
} from "./styles";
// import { useEffect } from "react";
// import { Image } from "react-native";
// import logoBall from '../../assets/ball.png';

interface PlacarProps {
  goalHome: number;
  goalAway: number;
  hasPenalts: boolean;
  penaltHome: number;
  penaltAway: number;
}

export function Placar({
  goalAway,
  goalHome,
  penaltAway,
  penaltHome,
  hasPenalts
}: PlacarProps) {
  // const opacityHome = useSharedValue(0);
  // const opacityAway = useSharedValue(0);

  // const styleHomeAnimated = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacityHome.value
  //   }
  // })
  // const styleAwayAnimated = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacityAway.value
  //   }
  // })
  
  // useEffect(() => {
  //   if(goalHome === 0) {
  //     return ;
  //   }
  //   opacityHome.value = withSequence(
  //     withTiming(1, { duration: 800, easing: Easing.bounce }),
  //     withTiming(0, { duration: 600, easing: Easing.sin }),
  //   );
  // }, [goalHome]);
  // useEffect(() => {
  //   if(goalAway === 0) {
  //     return ;
  //   }
  //   opacityAway.value = withSequence(
  //     withTiming(1, { duration: 800, easing: Easing.bounce }),
  //     withTiming(0, { duration: 600, easing: Easing.sin }),
  //   );
  // }, [goalAway]);

  return (
    <Container hasPenalts={hasPenalts}>
      <Text style={{ textAlign: 'right' }}>{goalHome}</Text>
      {hasPenalts && (
        <SubText style={{ textAlign: 'right' }}>{penaltHome}</SubText>
      )}
      {hasPenalts ? (
        <ContainerPenalts>
          <SubText>P</SubText>
          <Line />
        </ContainerPenalts>
      ) : (
        <Line />
      )}
      {hasPenalts && (
        <SubText style={{ textAlign: 'left' }}>{penaltAway}</SubText>
      )}
      <Text style={{ textAlign: 'left' }}>{goalAway}</Text>
      {/* <Animated.View style={[{
        position: 'absolute',
        left: 11,
        top: 8,
      }, styleHomeAnimated]}>
        <Image
          source={logoBall}
          style={{
            height: 40,
            width: 40,
          }}
        />
      </Animated.View>
      <Animated.View style={[{
        position: 'absolute',
        left: 73,
        top: 8,
      }, styleAwayAnimated]}>
        <Image
          source={logoBall}
          style={{
            height: 40,
            width: 40,
          }}
        />
      </Animated.View> */}
    </Container>
  )
}
