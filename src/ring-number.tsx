import { polarToCartesian } from './helpers';
import { Text } from 'react-native-svg';
import { NUMBER_MAP, type SegmentIndex } from './constants';
import React, { useContext } from 'react';
import { DartboardContext } from './dartboard-context';

interface RingNumberProps {
  segmentIndex: SegmentIndex;
}

export default function RingNumber({ segmentIndex }: RingNumberProps) {
  const { outerRadius, innerRadius } = useContext(DartboardContext);

  const position = polarToCartesian(
    outerRadius,
    outerRadius,
    outerRadius - (outerRadius - innerRadius) / 2,
    segmentIndex * 18
  );
  return (
    <Text x={position.x - outerRadius / 80} y={position.y + outerRadius / 24}>
      {NUMBER_MAP[segmentIndex]}
    </Text>
  );
}
