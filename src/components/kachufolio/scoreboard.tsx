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

interface ScoreboardProps {
  players: Player[];
  scores: Record<string, RoundScore[]>;
  totals: Record<string, number>;
  updateBid: (playerId: string, roundIndex: number, bid: number) => void;
  updateTaken: (playerId:string, roundIndex: number, taken: number) => void;
  removePlayer: (playerId: string) => void;
  gameRounds: number[];
}

export function Scoreboard({ players, scores, totals, updateBid, updateTaken, removePlayer, gameRounds }: ScoreboardProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg">
      <div className="overflow-x-auto">
        <Table className="min-w-[1200px]">
          <TableCaption>Kachufol Game Scoreboard</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="sticky left-0 bg-card z-10 w-[180px] font-semibold">Player</TableHead>
              {gameRounds.map((cards, index) => (
                <TableHead key={index} className="text-center w-32">
                  <div>Round {index + 1}</div>
                  <div className="text-xs font-normal text-muted-foreground">({cards} cards)</div>
                </TableHead>
              ))}
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
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
