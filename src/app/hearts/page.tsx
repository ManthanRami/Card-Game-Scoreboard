'use client';

import { HeartsGameSetup } from '@/components/hearts/hearts-game-setup';
import { HeartsHeader } from '@/components/hearts/hearts-header';
import { HeartsScoreboard } from '@/components/hearts/hearts-scoreboard';
import { useHeartsGame } from '@/hooks/use-hearts-game';
import { HeartsInitialSetup } from '@/components/hearts/hearts-initial-setup';
import { AdBanner } from '@/components/ad-banner';

export default function HeartsPage() {
  const {
    players,
    scores,
    totals,
    addPlayer,
    removePlayer,
    reorderPlayers,
    addRoundScores,
    resetGame,
    isGameOver,
    winner,
    numberOfPlayers,
    setupGame,
  } = useHeartsGame();

  const renderContent = () => {
    if (!numberOfPlayers) {
      return <HeartsInitialSetup onGameSetup={setupGame} />;
    }

    if (players.length < numberOfPlayers) {
      return <HeartsGameSetup players={players} onAddPlayer={addPlayer} onRemovePlayer={removePlayer} onReorderPlayers={reorderPlayers} numberOfPlayers={numberOfPlayers} />;
    }

    return (
      <>
        <HeartsScoreboard
          players={players}
          scores={scores}
          totals={totals}
          onAddRound={addRoundScores}
          isGameOver={isGameOver}
          winner={winner}
        />
        <AdBanner />
      </>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <HeartsHeader onNewGame={resetGame} />
      <main className="flex-1 container mx-auto p-2 sm:p-4 md:p-6">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
          <p>Take no prisoners... or points.</p>
      </footer>
    </div>
  );
}
