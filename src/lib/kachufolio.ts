export interface Player {
  id: string;
  name: string;
}

export interface RoundScore {
  bid?: number;
  taken?: number;
  score: number;
}

export interface GameState {
  players: Player[];
  scores: Record<string, RoundScore[]>; // Player ID -> Array of round scores
}

export const GAME_ROUNDS = [8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Calculates the score for a single round based on Kachufol rules.
 * If the bid matches the tricks taken, the player gets 10 + bid points.
 * Otherwise, the player gets 0 points.
 * @param bid The number of tricks bid.
 * @param taken The number of tricks taken.
 * @returns The calculated score for the round.
 */
export const calculateScore = (bid?: number, taken?: number): number => {
  if (bid === undefined || taken === undefined) {
    return 0;
  }
  if (bid === taken) {
    return 10 + bid;
  }
  return 0;
};
