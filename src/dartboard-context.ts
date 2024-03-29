import { createContext } from 'react';
import { type DartScore } from './types';

interface DartboardContext {
  outerRadius: number;
  innerRadius: number;
  doubleRadius: number;
  trebleRadius: number;
  innerSingleRadius: number;
  doubleHeight: number;
  trebleHeight: number;
  outerBullHeight: number;
  innerBullHeight: number;
  bullRadius: number;
  highlightedScores: DartScore[];
  onPress: (score: DartScore) => void;
}

export const DartboardContext = createContext({} as DartboardContext);
