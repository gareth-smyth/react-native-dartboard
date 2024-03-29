import { StyleSheet, View } from 'react-native';
import { Circle, G, Svg } from 'react-native-svg';
import { type DartScore } from './types';
import { NUMBER_MAP, type SegmentIndex } from './constants';
import BullsEye from './bullseye';
import RingNumber from './ring-number';
import Segment from './segment';
import { DartboardContext } from './dartboard-context';
import React from 'react';

interface DartBoardProps {
  diameter: number;
  highlightedScores: Array<DartScore>;
  onPress: (score: DartScore) => void;
}

const styles = StyleSheet.create({
  mainView: { alignItems: 'center', justifyContent: 'center' },
});

export default function DartBoard({
  diameter,
  highlightedScores,
  onPress,
}: DartBoardProps) {
  const doubleHeight = diameter / 20;
  const trebleHeight = diameter / 20;
  const outerBullHeight = diameter / 20;
  const innerBullHeight = diameter / 20;

  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - diameter / 10;
  const doubleRadius = innerRadius - doubleHeight;
  const trebleRadius = innerRadius * (11 / 17);
  const innerSingleRadius = trebleRadius - trebleHeight;
  const bullRadius = innerBullHeight + outerBullHeight;

  return (
    <View style={[StyleSheet.absoluteFill, styles.mainView]}>
      <Svg
        height={diameter}
        width={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <DartboardContext.Provider
          value={{
            outerRadius,
            innerRadius,
            doubleRadius,
            trebleRadius,
            innerSingleRadius,
            doubleHeight,
            trebleHeight,
            outerBullHeight,
            innerBullHeight,
            bullRadius,
            highlightedScores,
            onPress,
          }}
        >
          <Circle
            cx={outerRadius}
            cy={outerRadius}
            r={outerRadius}
            fill="#000000"
          />

          <G stroke="#C0C0C0">
            {/* Loop through each pair of segments (green and red) and draw them. */}
            {[...Array(10).keys()].map((segmentIndex) => {
              const redStartAngle = segmentIndex * 36 - 9;
              const greenStartAngle = segmentIndex * 36 + 9;

              const redValue = NUMBER_MAP[segmentIndex * 2]!;
              const greenValue = NUMBER_MAP[segmentIndex * 2 + 1]!;

              return (
                <G key={`segment-pair-${segmentIndex}`}>
                  <Segment
                    startAngle={redStartAngle}
                    value={redValue}
                    singleColor="#000000"
                    multiColor="#FF0000"
                  />
                  <Segment
                    startAngle={greenStartAngle}
                    value={greenValue}
                    singleColor="#E7E4C7"
                    multiColor="#00A000"
                  />
                </G>
              );
            })}
            <BullsEye />
          </G>
          <G
            fontSize="28px"
            textAnchor="middle"
            fill="#C0C0C0"
            fillOpacity={1}
            fontFamily="Sans"
          >
            {[...Array(20).keys()].map((segmentIndex) => {
              return (
                <RingNumber
                  key={segmentIndex}
                  segmentIndex={segmentIndex as SegmentIndex}
                />
              );
            })}
          </G>
        </DartboardContext.Provider>
      </Svg>
    </View>
  );
}
