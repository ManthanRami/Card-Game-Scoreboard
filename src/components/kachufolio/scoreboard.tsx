import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlayerRow } from './player-row';
import type { Player, RoundScore } from '@/lib/kachufolio';
import { trumpSuitSequence } from '@/lib/kachufolio';
import { SuitDisplay } from './suit-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScoreboardProps {
  players: Player[];
  scores: Record<string, RoundScore[]>;
  totals: Record<string, number>;
  updateBid: (playerId: string, roundIndex: number, bid: number) => void;
  updateTaken: (playerId:string, roundIndex: number, taken: number) => void;
  removePlayer: (playerId: string) => void;
  gameRounds: number[];
  currentRoundCount: number;
}

export function Scoreboard({ players, scores, totals, updateBid, updateTaken, removePlayer, gameRounds, currentRoundCount }: ScoreboardProps) {
  const roundsToDisplay = Array.from({ length: currentRoundCount }, (_, i) => i);
  
  return (
     <Card>
      <CardHeader>
        <CardTitle>Scoreboard</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-2">
         <div className="w-full overflow-auto">
          <Table>
            <TableCaption>Kachufol Game Scoreboard</TableCaption>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="sticky left-0 bg-card z-10 w-[140px] font-semibold text-left">Player</TableHead>
                {roundsToDisplay.map((roundIndex) => {
                  const trumpSuit = trumpSuitSequence[roundIndex % trumpSuitSequence.length];
                  return (
                    <TableHead key={roundIndex} className="text-center w-[100px]">
                      <div className="font-semibold">R{roundIndex + 1} <span className="text-xs font-normal text-muted-foreground">({gameRounds[roundIndex]})</span></div>
                      <div className="flex items-center justify-center h-6 mx-auto">
                        <SuitDisplay suit={trumpSuit} />
                      </div>
                    </TableHead>
                  )
                })}
                <TableHead className="sticky right-0 bg-card z-10 text-center font-semibold w-[110px]">Total</TableHead>
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
      </CardContent>
    </Card>
  );
}
