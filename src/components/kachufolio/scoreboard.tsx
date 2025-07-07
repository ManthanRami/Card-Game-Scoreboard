import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlayerRow } from './player-row';
import type { Player, RoundScore } from '@/lib/kachufolio';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface ScoreboardProps {
  players: Player[];
  scores: Record<string, RoundScore[]>;
  totals: Record<string, number>;
  updateBid: (playerId: string, roundIndex: number, bid: number) => void;
  updateTaken: (playerId:string, roundIndex: number, taken: number) => void;
  removePlayer: (playerId: string) => void;
  gameRounds: number[];
  addRound: () => void;
  currentRoundCount: number;
}

export function Scoreboard({ players, scores, totals, updateBid, updateTaken, removePlayer, gameRounds, addRound, currentRoundCount }: ScoreboardProps) {
  const roundsToDisplay = Array.from({ length: currentRoundCount }, (_, i) => i);
  const canAddRound = currentRoundCount < gameRounds.length;

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Kachufol Game Scoreboard</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="sticky left-0 bg-card z-10 w-[180px] font-semibold">Player</TableHead>
              {roundsToDisplay.map((roundIndex) => (
                <TableHead key={roundIndex} className="text-center w-36">
                  <div>Round {roundIndex + 1}</div>
                  <div className="text-xs font-normal text-muted-foreground">({gameRounds[roundIndex]} cards)</div>
                </TableHead>
              ))}
              {canAddRound && (
                <TableHead className="text-center w-32">
                  <Button variant="outline" size="sm" onClick={addRound}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Round
                  </Button>
                </TableHead>
              )}
              <TableHead className="sticky right-0 bg-card z-10 text-center font-semibold w-[150px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <PlayerRow
                key={player.id}
                player={player}
                playerScores={scores[player.id] || []}
                totalScore={totals[player.id] || 0}
                updateBid={updateBid}
                updateTaken={updateTaken}
                removePlayer={removePlayer}
                gameRounds={gameRounds}
                canAddRound={canAddRound}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
