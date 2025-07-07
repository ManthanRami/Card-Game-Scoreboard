'use client';

import { GameHeader } from '@/components/kachufolio/header';
import { Scoreboard } from '@/components/kachufolio/scoreboard';
import { useKachufolioGame } from '@/hooks/use-kachufolio-game';
import { GameSetup } from '@/components/kachufolio/game-setup';
import { RaceVisualization } from '@/components/kachufolio/race-visualization';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function KachufolioPage() {
  const {
    players,
    scores,
    addPlayer,
    updateBid,
    updateTaken,
    resetGame,
    removePlayer,
    reorderPlayers,
    totals,
    numberOfPlayers,
    gameRounds,
    setupGame,
    addRound,
    currentRoundCount,
  } = useKachufolioGame();

  const renderContent = () => {
    // If the game isn't fully set up (either config is missing or players are missing), show the setup component.
    if (!numberOfPlayers || players.length < numberOfPlayers) {
      return (
        <GameSetup
          onGameSetup={setupGame}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onReorderPlayers={reorderPlayers}
          players={players}
          numberOfPlayers={numberOfPlayers}
        />
      );
    }

    const canAddRound = currentRoundCount < gameRounds.length;

    return (
      <>
        <RaceVisualization players={players} totals={totals} />
        <Scoreboard
          players={players}
          scores={scores}
          totals={totals}
          updateBid={updateBid}
          updateTaken={updateTaken}
          removePlayer={removePlayer}
          gameRounds={gameRounds}
          currentRoundCount={currentRoundCount}
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          {canAddRound && (
            <Button onClick={addRound} size="lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Start Round {currentRoundCount + 1}
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <GameHeader onNewGame={resetGame} />
      <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>Built for the modern Kachufol player.</p>
      </footer>
    </div>
  );
}
