'use client';

import type { Player } from '@/lib/kachufolio'; // Re-using Player type
import { useState, useMemo, useCallback, useEffect } from 'react';

const simpleId = () => Math.random().toString(36).substring(2, 9);
const HEARTS_STORAGE_KEY = 'hearts-game-state';

interface HeartsGameState {
  players: Player[];
  scores: Record<string, number[]>;
  numberOfPlayers: number | null;
}

const getInitialState = (): HeartsGameState => ({
  players: [],
  scores: {},
  numberOfPlayers: null,
});

const getStoredState = (): HeartsGameState => {
    if (typeof window === 'undefined') {
      return getInitialState();
    }
    try {
      const savedState = localStorage.getItem(HEARTS_STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState) as HeartsGameState;
        if (parsedState.players && parsedState.scores && parsedState.numberOfPlayers) {
          return parsedState;
        }
      }
    } catch (error) {
      console.error("Failed to load Hearts game state from local storage", error);
      localStorage.removeItem(HEARTS_STORAGE_KEY);
    }
    return getInitialState();
};

export function useHeartsGame() {
  const [gameState, setGameState] = useState<HeartsGameState>(getStoredState);

  useEffect(() => {
    try {
      if (gameState.numberOfPlayers) {
        localStorage.setItem(HEARTS_STORAGE_KEY, JSON.stringify(gameState));
      } else {
        localStorage.removeItem(HEARTS_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save Hearts game state to local storage", error);
    }
  }, [gameState]);

  const setupGame = useCallback((numPlayers: number) => {
    setGameState({
      players: [],
      scores: {},
      numberOfPlayers: numPlayers,
    });
  }, []);

  const addPlayer = useCallback((name: string) => {
    setGameState((prev) => {
      if (!prev.numberOfPlayers || prev.players.length >= prev.numberOfPlayers) return prev;
      if (prev.players.some(p => p.name.toLowerCase() === name.toLowerCase())) return prev;
      
      const newPlayer: Player = { id: simpleId(), name };
      return {
        ...prev,
        players: [...prev.players, newPlayer],
        scores: { ...prev.scores, [newPlayer.id]: [] },
      };
    });
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setGameState(prev => {
      const newPlayers = prev.players.filter(p => p.id !== playerId);
      if (newPlayers.length === prev.players.length) return prev;

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
      if (sourceIndex < 0 || sourceIndex >= prev.players.length || destinationIndex < 0 || destinationIndex >= prev.players.length) {
        return prev;
      }
      const newPlayers = [...prev.players];
      const [movedPlayer] = newPlayers.splice(sourceIndex, 1);
      newPlayers.splice(destinationIndex, 0, movedPlayer);
      return { ...prev, players: newPlayers };
    });
  }, []);

  const addRoundScores = useCallback((roundScores: Record<string, number>) => {
    setGameState(prev => {
        const newScores = { ...prev.scores };
        for(const player of prev.players) {
            newScores[player.id] = [...(newScores[player.id] || []), roundScores[player.id] || 0];
        }
        return {
            ...prev,
            scores: newScores,
        };
    });
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(HEARTS_STORAGE_KEY);
    localStorage.removeItem('kachufolio-game-state');
    setGameState(getInitialState());
  }, []);

  const totals = useMemo(() => {
    const playerTotals: Record<string, number> = {};
    if (!gameState.numberOfPlayers || gameState.players.length < gameState.numberOfPlayers) {
      return {};
    }

    for (const player of gameState.players) {
      playerTotals[player.id] = (gameState.scores[player.id] || []).reduce((acc, score) => acc + score, 0);
    }
    return playerTotals;
  }, [gameState.scores, gameState.players, gameState.numberOfPlayers]);

  const { isGameOver, winner } = useMemo(() => {
    const playerScores = Object.entries(totals);
    if (playerScores.length === 0) {
      return { isGameOver: false, winner: null };
    }
    
    const gameOver = playerScores.some(([, score]) => score >= 100);
    if (!gameOver) {
      return { isGameOver: false, winner: null };
    }

    let lowestScore = Infinity;
    let winnerId: string | null = null;

    for (const [playerId, score] of playerScores) {
      if (score < lowestScore) {
        lowestScore = score;
        winnerId = playerId;
      }
    }
    
    const winningPlayer = gameState.players.find(p => p.id === winnerId) || null;

    return { isGameOver: true, winner: winningPlayer };
  }, [totals, gameState.players]);


  return {
    players: gameState.players,
    scores: gameState.scores,
    numberOfPlayers: gameState.numberOfPlayers,
    setupGame,
    addPlayer,
    removePlayer,
    reorderPlayers,
    addRoundScores,
    resetGame,
    totals,
    isGameOver,
    winner,
  };
}
