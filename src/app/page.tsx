'use client';

import { AddPlayerForm } from '@/components/kachufolio/add-player-form';
import { GameHeader } from '@/components/kachufolio/header';
import { Scoreboard } from '@/components/kachufolio/scoreboard';
import { useKachufolioGame } from '@/hooks/use-kachufolio-game';
import { Button } from '@/components/ui/button';
import { GameSetup } from '@/components/kachufolio/game-setup';

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
    numberOfPlayers,
    gameRounds,
    setupGame,
  } = useKachufolioGame();

  const handleNewGame = () => {
    // This will now take the user back to the setup screen.
    resetGame();
  };

  if (!numberOfPlayers) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
        <GameHeader onNewGame={handleNewGame} />
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <GameHeader onNewGame={handleNewGame} />
      <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
        {players.length === 0 ? (
          <div className="text-center py-20 px-4">
            <h2 className="text-2xl font-semibold mb-2">Game for {numberOfPlayers} Players</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">The scoreboard is ready. Add the players to begin.</p>
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
              gameRounds={gameRounds}
            />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              { !allPlayersAdded ? <AddPlayerForm onAddPlayer={addPlayer} /> : <div className="text-sm text-muted-foreground">All {numberOfPlayers} players have been added.</div> }
              <Button variant="destructive" onClick={handleNewGame}>
                New Game
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
