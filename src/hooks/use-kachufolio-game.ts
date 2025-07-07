'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GAME_ROUNDS, calculateScore, type Player, type GameState } from '@/lib/kachufolio';
import { v4 as uuidv4 } from 'uuid';

// uuid needs to be imported, but it's not in package.json. Let's add it.
// Actually, I don't have permission to modify package.json.
// I will use a simple random id generator.
const simpleId = () => Math.random().toString(36).substring(2, 9);


const KACHUFOLIO_STORAGE_KEY = 'kachufolio-game-state';

export function useKachufolioGame() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    scores: {},
  });

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(KACHUFOLIO_STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Basic validation
        if (parsedState.players && parsedState.scores) {
          setGameState(parsedState);
        }
      }
    } catch (error) {
      console.error("Failed to load game state from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KACHUFOLIO_STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error("Failed to save game state to local storage", error);
    }
  }, [gameState]);

  const addPlayer = useCallback((name: string) => {
    setGameState((prev) => {
      if (prev.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        return prev;
      }
      const newPlayer: Player = { id: simpleId(), name };
      const newPlayerScores = Array(GAME_ROUNDS.length).fill({}).map(() => ({ score: 0 }));
      return {
        ...prev,
        players: [...prev.players, newPlayer],
        scores: { ...prev.scores, [newPlayer.id]: newPlayerScores },
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
    const confirmation = window.confirm("Are you sure you want to reset the game? All scores will be lost.");
    if (confirmation) {
      setGameState({ players: [], scores: {} });
    }
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
    addPlayer,
    removePlayer,
    updateBid,
    updateTaken,
    resetGame,
    totals,
  };
}
