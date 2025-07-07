export interface Player {
  id: string;
  name: string;
}

export interface RoundScore {
  bid?: number;
  taken?: number;
  score: number;
}

export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export const Suits: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

// The predefined, repeating sequence for trump suits.
export const trumpSuitSequence: Suit[] = ['spades', 'diamonds', 'clubs', 'hearts'];

export interface GameState {
  players: Player[];
  scores: Record<string, RoundScore[]>; // Player ID -> Array of round scores
  numberOfPlayers: number | null;
  gameRounds: number[];
  currentRoundCount: number;
}

export const generateGameRounds = (numberOfPlayers: number): number[] => {
  if (numberOfPlayers < 2) return [];
  // Standard 52 card deck
  const maxCards = Math.floor(52 / numberOfPlayers);
  if (maxCards < 1) return [];

  const up = Array.from({ length: maxCards }, (_, i) => i + 1);
  const down = Array.from({ length: maxCards }, (_, i) => maxCards - i);
  
  // As per user example: 1..max, max..1, 1..max
  return [...up, ...down, ...up];
};


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
