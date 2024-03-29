import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import DartBoard from 'react-native-dartboard';
import { useState } from 'react';
import type { DartScore } from '../../src/types';

export default function App() {
  const [highlightedScores, setHighlightedScores] = useState([] as DartScore[]);
  const [diameter, setDiameter] = useState(0);

  function toggleHighlight(score: DartScore) {
    const existingIndex = highlightedScores.findIndex(
      (findingScore) =>
        score.value === findingScore.value &&
        score.modifier === findingScore.modifier
    );
    if (existingIndex > -1) {
      const newScores = [...highlightedScores];
      newScores.splice(existingIndex, 1);
      setHighlightedScores(newScores);
    } else {
      setHighlightedScores([...highlightedScores, score]);
    }
  }

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        let { width, height } = event.nativeEvent.layout;
        setDiameter(Math.min(width, height));
      }}
    >
      <DartBoard
        highlightedScores={highlightedScores}
        onPress={toggleHighlight}
        diameter={diameter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
