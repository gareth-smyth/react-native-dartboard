import { Circle, G } from 'react-native-svg';
import React, { useContext, useEffect } from 'react';
import { DartboardContext } from './dartboard-context';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function BullsEye() {
  const {
    outerRadius,
    outerBullHeight,
    innerBullHeight,
    highlightedScores,
    onPress,
  } = useContext(DartboardContext);
  const showInnerHighLight =
    highlightedScores.length &&
    highlightedScores.find((score) => score.value === 50);
  const showOuterHighLight =
    highlightedScores.length &&
    highlightedScores.find((score) => score.value === 25);

  const sv = useSharedValue(5);

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(sv.value === 5 ? 2 : 5, { duration: 1000 }),
      -1,
      true
    );
  }, [sv]);

  const animatedInnerProps = useAnimatedProps(() => {
    return { strokeWidth: showInnerHighLight ? sv.value : 0 };
  });

  const animatedOuterProps = useAnimatedProps(() => {
    return { strokeWidth: showOuterHighLight ? sv.value : 0 };
  });

  return (
    <G>
      <AnimatedCircle
        cx={outerRadius}
        cy={outerRadius}
        r={outerBullHeight + innerBullHeight}
        fill="#00A000"
        opacity={!highlightedScores.length || showOuterHighLight ? 1 : 0.3}
        animatedProps={animatedOuterProps}
        stroke="#FFFF00"
        /* @ts-expect-error - onClick is not typed but is required for web */
        onClick={() => onPress({ value: 25, modifier: 1 })}
        onPress={() => onPress({ value: 25, modifier: 1 })}
      />
      <AnimatedCircle
        cx={outerRadius}
        cy={outerRadius}
        r={innerBullHeight}
        fill="#FF0000"
        opacity={!highlightedScores.length || showInnerHighLight ? 1 : 0.3}
        animatedProps={animatedInnerProps}
        stroke="#FFFF00"
        /* @ts-expect-error - onClick is not typed but is required for web */
        onClick={() => onPress({ value: 50, modifier: 1 })}
        onPress={() => onPress({ value: 50, modifier: 1 })}
      />
    </G>
  );
}
