'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { generateGameRounds, calculateScore, type Player, type GameState } from '@/lib/kachufolio';

const simpleId = () => Math.random().toString(36).substring(2, 9);

const KACHUFUL_STORAGE_KEY = 'kachuful-game-state';

const getInitialState = (): GameState => ({
  players: [],
  scores: {},
  numberOfPlayers: null,
  gameRounds: [],
  currentRoundCount: 0,
  numberOfDecks: 1,
});

const getStoredState = (): GameState => {
    if (typeof window === 'undefined') {
      return getInitialState();
    }
    try {
      const savedState = localStorage.getItem(KACHUFUL_STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState) as GameState;
        if (parsedState.players && parsedState.scores && parsedState.numberOfPlayers && parsedState.currentRoundCount > 0) {
           // This ensures backward compatibility for states saved without numberOfDecks
          if (!('numberOfDecks' in parsedState)) {
            parsedState.numberOfDecks = 1;
          }
          return parsedState;
        }
      }
    } catch (error) {
      console.error("Failed to load game state from local storage", error);
      localStorage.removeItem(KACHUFUL_STORAGE_KEY);
    }
    return getInitialState();
};


export function useKachufulGame() {
  const [gameState, setGameState] = useState<GameState>(getStoredState);

  useEffect(() => {
    try {
      if (gameState.numberOfPlayers !== null && gameState.currentRoundCount > 0) {
        localStorage.setItem(KACHUFUL_STORAGE_KEY, JSON.stringify(gameState));
      } else {
        localStorage.removeItem(KACHUFUL_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save game state to local storage", error);
    }
  }, [gameState]);
  
  const setupGame = useCallback((numPlayers: number, numDecks: number) => {
    setGameState(() => {
        const rounds = generateGameRounds(numPlayers, numDecks);
        return {
            players: [],
            scores: {},
            numberOfPlayers: numPlayers,
            gameRounds: rounds,
            currentRoundCount: 1,
            numberOfDecks: numDecks,
        };
    });
  }, []);

  const addPlayer = useCallback((name: string) => {
    setGameState((prev) => {
      if (!prev.numberOfPlayers || prev.players.length >= prev.numberOfPlayers) return prev;

      if (prev.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        return prev;
      }
      const newPlayer: Player = { id: simpleId(), name };
      const newPlayerScores = Array(prev.currentRoundCount).fill({}).map(() => ({ score: 0 }));
      return {
        ...prev,
        players: [...prev.players, newPlayer],
        scores: { ...prev.scores, [newPlayer.id]: newPlayerScores },
      };
    });
  }, []);

  const addRound = useCallback(() => {
    setGameState((prev) => {
      if (prev.currentRoundCount >= prev.gameRounds.length || prev.players.length === 0) {
        return prev;
      }

      const newScores = { ...prev.scores };
      for (const player of prev.players) {
        newScores[player.id] = [...(newScores[player.id] || []), { score: 0 }];
      }

      return {
        ...prev,
        currentRoundCount: prev.currentRoundCount + 1,
        scores: newScores,
      };
    });
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setGameState((prev) => {
      const newPlayers = prev.players.filter((p) => p.id !== playerId);
      const newScores = { ...prev.scores };
      delete newScores[playerId];
      return {
        ...prev,
        players: newPlayers,
        scores: newScores,
      };
    });
  }, []);

  const reorderPlayers = useCallback((sourceIndex: number, destinationIndex: number) => {
    setGameState(prev => {
      if (
        sourceIndex < 0 ||
        sourceIndex >= prev.players.length ||
        destinationIndex < 0 ||
        destinationIndex >= prev.players.length
      ) {
        return prev;
      }

      const newPlayers = [...prev.players];
      const [movedPlayer] = newPlayers.splice(sourceIndex, 1);
      newPlayers.splice(destinationIndex, 0, movedPlayer);

      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  const updateScoreProperty = useCallback((playerId: string, roundIndex: number, property: 'bid' | 'taken', value: number) => {
    setGameState((prev) => {
      if (!prev.scores[playerId] || !prev.scores[playerId][roundIndex]) return prev;

      const updatedPlayerScores = [...prev.scores[playerId]];
      const currentRound = { ...updatedPlayerScores[roundIndex] };
      
      const newPropValue = isNaN(value) ? undefined : value;

      const newBid = property === 'bid' ? newPropValue : currentRound.bid;
      const newTaken = property === 'taken' ? newPropValue : currentRound.taken;

      updatedPlayerScores[roundIndex] = {
        ...currentRound,
        bid: newBid,
        taken: newTaken,
        score: calculateScore(newBid, newTaken),
      };

      return {
        ...prev,
        scores: {
          ...prev.scores,
          [playerId]: updatedPlayerScores,
        },
      };
    });
  }, []);

  const updateBid = useCallback((playerId: string, roundIndex: number, bid: number) => {
    updateScoreProperty(playerId, roundIndex, 'bid', bid);
  }, [updateScoreProperty]);

  const updateTaken = useCallback((playerId: string, roundIndex: number, taken: number) => {
    updateScoreProperty(playerId, roundIndex, 'taken', taken);
  }, [updateScoreProperty]);

  const resetGame = useCallback(() => {
    localStorage.removeItem(KACHUFUL_STORAGE_KEY);
    localStorage.removeItem('hearts-game-state');
    setGameState(getInitialState());
  }, []);
  
  const totals = useMemo(() => {
    const playerTotals: Record<string, number> = {};
    for (const player of gameState.players) {
        playerTotals[player.id] = (gameState.scores[player.id] || []).reduce((acc, round) => acc + round.score, 0);
    }
    return playerTotals;
  }, [gameState.scores, gameState.players]);


  return {
    ...gameState,
    setupGame,
    addPlayer,
    removePlayer,
    reorderPlayers,
    updateBid,
    updateTaken,
    resetGame,
    addRound,
    totals,
  };
}
