import { G } from 'react-native-svg';
import { type DartSegment } from './types';
import React, { useContext } from 'react';
import { DartboardContext } from './dartboard-context';
import SegmentSection from './segment-section';

interface SegmentProps {
  startAngle: number;
  value: DartSegment;
  singleColor: string;
  multiColor: string;
}

export default function Segment({
  startAngle,
  value,
  singleColor,
  multiColor,
}: SegmentProps) {
  const {
    innerRadius,
    doubleRadius,
    trebleRadius,
    trebleHeight,
    bullRadius,
    highlightedScores,
  } = useContext(DartboardContext);

  const highlightSingle = !!(
    highlightedScores.length &&
    !!highlightedScores.find(
      (score) => score.value === value && score.modifier === 1
    )
  );

  const highlightTreble = !!(
    highlightedScores.length &&
    highlightedScores.find(
      (score) => score.value === value && score.modifier === 3
    )
  );

  const highlightDouble = !!(
    highlightedScores.length &&
    !!highlightedScores.find(
      (score) => score.value === value && score.modifier === 2
    )
  );

  return (
    <G>
      <SegmentSection
        startAngle={startAngle}
        color={singleColor}
        sectionInnerRadius={bullRadius}
        sectionOuterRadius={trebleRadius - trebleHeight}
        highlight={highlightSingle}
        score={{ value: value, modifier: 1 }}
      />
      <SegmentSection
        startAngle={startAngle}
        color={multiColor}
        sectionInnerRadius={trebleRadius - trebleHeight}
        sectionOuterRadius={trebleRadius}
        highlight={highlightTreble}
        score={{ value: value, modifier: 3 }}
      />
      <SegmentSection
        startAngle={startAngle}
        color={singleColor}
        sectionInnerRadius={trebleRadius}
        sectionOuterRadius={doubleRadius}
        highlight={highlightSingle}
        score={{ value: value, modifier: 1 }}
      />
      <SegmentSection
        startAngle={startAngle}
        color={multiColor}
        sectionInnerRadius={doubleRadius}
        sectionOuterRadius={innerRadius}
        highlight={highlightDouble}
        score={{ value: value, modifier: 2 }}
      />
    </G>
  );
}
