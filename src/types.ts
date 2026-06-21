/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Organ {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;          // Tailwind background color for icons/decorations
  textColor: string;        // Text colors
  selfIntroTitle: string;
  introduction: string;
  keyFunctions: string[];
  oneLineFunction: string;
  videoUrl: string;
}

export interface Matchup {
  id: string;
  round: number; // 8 for quarterfinals, 4 for semifinals, 2 for finals
  left: Organ;
  right: Organ;
  winner?: Organ;
}

export interface Tournament {
  id: string;
  date: string;
  winner: Organ;
  runnersUp: string[]; // List of historical winners/finalists to keep score
}
