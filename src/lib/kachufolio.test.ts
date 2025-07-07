import { calculateScore, generateGameRounds } from './kachufolio';

describe('Kachufolio Game Logic', () => {
  describe('calculateScore', () => {
    it('should return 0 if bid is undefined', () => {
      expect(calculateScore(undefined, 5)).toBe(0);
    });

    it('should return 0 if taken is undefined', () => {
      expect(calculateScore(3, undefined)).toBe(0);
    });

    it('should return 0 if bid does not match taken', () => {
      expect(calculateScore(3, 2)).toBe(0);
    });

    it('should return 10 + bid if bid matches taken', () => {
      expect(calculateScore(0, 0)).toBe(10);
      expect(calculateScore(3, 3)).toBe(13);
      expect(calculateScore(8, 8)).toBe(18);
    });
  });

  describe('generateGameRounds', () => {
    it('should return an empty array for less than 2 players', () => {
      expect(generateGameRounds(1, 1)).toEqual([]);
    });

    it('should generate rounds correctly for 4 players with 1 deck (default)', () => {
      // 52 cards / 4 players = 13 max cards
      const max = 13;
      const up = Array.from({ length: max }, (_, i) => i + 1);
      const down = Array.from({ length: max }, (_, i) => max - i);
      const expected = [...up, ...down, ...up];
      expect(generateGameRounds(4)).toEqual(expected);
      expect(generateGameRounds(4, 1)).toEqual(expected);
      expect(generateGameRounds(4, 1).length).toBe(39);
    });

    it('should generate rounds correctly for 6 players with 1 deck', () => {
        // 52 cards / 6 players = 8 max cards
        const max = 8;
        const up = Array.from({ length: max }, (_, i) => i + 1);
        const down = Array.from({ length: max }, (_, i) => max - i);
        const expected = [...up, ...down, ...up];
        expect(generateGameRounds(6, 1)).toEqual(expected);
        expect(generateGameRounds(6, 1).length).toBe(24);
    });
    
    it('should generate rounds correctly for 4 players with 2 decks', () => {
      // 104 cards / 4 players = 26 max cards
      const max = 26;
      const up = Array.from({ length: max }, (_, i) => i + 1);
      const down = Array.from({ length: max }, (_, i) => max - i);
      const expected = [...up, ...down, ...up];
      expect(generateGameRounds(4, 2)).toEqual(expected);
      expect(generateGameRounds(4, 2).length).toBe(78);
    });

    it('should return an empty array if max cards is less than 1', () => {
      expect(generateGameRounds(53, 1)).toEqual([]);
      expect(generateGameRounds(105, 2)).toEqual([]);
    });
  });
});
