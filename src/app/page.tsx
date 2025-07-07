'use client';

import { AddPlayerForm } from '@/components/kachufolio/add-player-form';
import { GameHeader } from '@/components/kachufolio/header';
import { Scoreboard } from '@/components/kachufolio/scoreboard';
import { useKachufolioGame } from '@/hooks/use-kachufolio-game';
import { Button } from '@/components/ui/button';

export default function Home() {
  const {
    players,
    scores,
    addPlayer,
    updateBid,
    updateTaken,
    resetGame,
    removePlayer,
    totals,
  } = useKachufolioGame();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <GameHeader onNewGame={resetGame} />
      <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
        {players.length === 0 ? (
          <div className="text-center py-20 px-4">
            <h2 className="text-2xl font-semibold mb-2">Welcome to KachuFolio!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">The modern scoreboard for your Kachufol (Judgement) games. Add some players to get started.</p>
            <AddPlayerForm onAddPlayer={addPlayer} />
          </div>
        ) : (
          <>
            <Scoreboard
              players={players}
              scores={scores}
              totals={totals}
              updateBid={updateBid}
              updateTaken={updateTaken}
              removePlayer={removePlayer}
            />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <AddPlayerForm onAddPlayer={addPlayer} />
              <Button variant="destructive" onClick={resetGame}>
                Reset Game
              </Button>
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
