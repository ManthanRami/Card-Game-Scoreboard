'use client';

import { AddPlayerForm } from '@/components/kachufolio/add-player-form';
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
    totals,
    numberOfPlayers,
    gameRounds,
    setupGame,
    addRound,
    currentRoundCount,
  } = useKachufolioGame();

  if (!numberOfPlayers) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
        <GameHeader onNewGame={resetGame} />
        <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
          <GameSetup onGameSetup={setupGame} />
        </main>
         <footer className="text-center p-4 text-sm text-muted-foreground">
          <p>Built for the modern Kachufol player.</p>
        </footer>
      </div>
    );
  }

  const allPlayersAdded = players.length === numberOfPlayers;
  const canAddRound = currentRoundCount < gameRounds.length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <GameHeader onNewGame={resetGame} />
      <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
        {players.length === 0 ? (
          <div className="text-center py-20 px-4">
            <h2 className="text-2xl font-semibold mb-2">Game for {numberOfPlayers} Players</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">The scoreboard is ready. Add the players to begin.</p>
            <AddPlayerForm onAddPlayer={addPlayer} />
          </div>
        ) : (
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
              {allPlayersAdded && canAddRound && (
                <Button onClick={addRound} size="lg">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Start Round {currentRoundCount + 1}
                </Button>
              )}
              {!allPlayersAdded && (
                <div className="w-full max-w-sm">
                  <p className="text-center text-sm text-muted-foreground mb-2">Add the remaining players to continue.</p>
                  <AddPlayerForm onAddPlayer={addPlayer} />
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        <p>Built for the modern Kachufol player.</p>
      </footer>
    </div>
  );
}
