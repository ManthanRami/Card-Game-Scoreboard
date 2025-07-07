'use client';

import type { Player } from '@/lib/kachufolio';
import { GameConfigForm } from './game-config-form';
import { PlayerEntryForm } from './player-entry-form';

interface GameSetupProps {
  onGameSetup: (numberOfPlayers: number, numberOfDecks: number) => void;
  onAddPlayer?: (name: string) => void;
  onRemovePlayer?: (playerId: string) => void;
  onReorderPlayers?: (sourceIndex: number, destinationIndex: number) => void;
  players?: Player[];
  numberOfPlayers?: number | null;
}

export function GameSetup({ onGameSetup, onAddPlayer, onRemovePlayer, onReorderPlayers, players = [], numberOfPlayers = null }: GameSetupProps) {
  
  const renderContent = () => {
    // If we haven't configured the number of players yet, show the config form.
    if (!numberOfPlayers) {
      return <GameConfigForm onGameSetup={onGameSetup} />;
    }

    // Otherwise, show the player entry form.
    // The required props should be available if numberOfPlayers is set.
    if (onAddPlayer && onRemovePlayer && onReorderPlayers) {
      return (
        <PlayerEntryForm 
          players={players}
          numberOfPlayers={numberOfPlayers}
          onAddPlayer={onAddPlayer}
          onRemovePlayer={onRemovePlayer}
          onReorderPlayers={onReorderPlayers}
        />
      );
    }

    // Fallback in case props are not passed correctly, though this shouldn't happen in the app's flow.
    return null;
  }
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      {renderContent()}
    </div>
  );
}
