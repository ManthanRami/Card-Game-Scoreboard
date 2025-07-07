'use client';

import { HeartsGameSetup } from '@/components/hearts/hearts-game-setup';
import { HeartsHeader } from '@/components/hearts/hearts-header';
import { HeartsScoreboard } from '@/components/hearts/hearts-scoreboard';
import { useHeartsGame } from '@/hooks/use-hearts-game';

export default function HeartsPage() {
  const {
    players,
    scores,
    totals,
    addPlayer,
    addRoundScores,
    resetGame,
    isGameOver,
    winner,
  } = useHeartsGame();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <HeartsHeader onNewGame={resetGame} />
      <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
        {players.length < 4 ? (
           <HeartsGameSetup players={players} onAddPlayer={addPlayer} />
        ) : (
          <HeartsScoreboard
            players={players}
            scores={scores}
            totals={totals}
            onAddRound={addRoundScores}
            isGameOver={isGameOver}
            winner={winner}
          />
        )}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
          <p>Take no prisoners... or points.</p>
      </footer>
    </div>
  );
}
