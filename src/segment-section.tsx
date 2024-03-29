import { Path } from 'react-native-svg';
import { type DartScore } from './types';
import { polarToCartesian } from './helpers';
import React, { useContext, useEffect } from 'react';
import { DartboardContext } from './dartboard-context';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface SegmentProps {
  startAngle: number;
  color: string;
  sectionInnerRadius: number;
  sectionOuterRadius: number;
  highlight: boolean;
  score: DartScore;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SegmentSection({
  startAngle,
  color,
  sectionInnerRadius,
  sectionOuterRadius,
  score,
  highlight,
}: SegmentProps) {
  const {
    outerRadius: centerXY,
    onPress,
    highlightedScores,
  } = useContext(DartboardContext);

  const outerSegmentPos1 = polarToCartesian(
    centerXY,
    centerXY,
    sectionOuterRadius,
    startAngle
  );
  const outerSegmentPos2 = polarToCartesian(
    centerXY,
    centerXY,
    sectionOuterRadius,
    startAngle + 18
  );
  const innerSegmentPos1 = polarToCartesian(
    centerXY,
    centerXY,
    sectionInnerRadius,
    startAngle
  );
  const innerSegmentPos2 = polarToCartesian(
    centerXY,
    centerXY,
    sectionInnerRadius,
    startAngle + 18
  );

  const showHighlights = highlightedScores.length && highlight;

  const sv = useSharedValue(5);

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(sv.value === 5 ? 2 : 5, { duration: 1000 }),
      -1,
      true
    );
  }, [sv]);

  const animatedProps = useAnimatedProps(() => {
    return { strokeWidth: showHighlights ? sv.value : 0 };
  });

  return (
    <AnimatedPath
      d={`
          M ${outerSegmentPos2.x} ${outerSegmentPos2.y}
          A ${centerXY} ${centerXY} 0 0 0 ${outerSegmentPos1.x} ${outerSegmentPos1.y}
          L ${innerSegmentPos1.x} ${innerSegmentPos1.y}
          A ${centerXY} ${centerXY} 0 0 1 ${innerSegmentPos2.x} ${innerSegmentPos2.y}
          Z`}
      fill={color}
      fillOpacity={!highlightedScores.length || showHighlights ? 1 : 0.3}
      /* @ts-expect-error - onClick is not typed but is required for web */
      onClick={() => onPress(score)}
      onPress={() => onPress(score)}
      animatedProps={animatedProps}
      stroke="#FFFF00"
      opacity={1}
    />
  );
}
