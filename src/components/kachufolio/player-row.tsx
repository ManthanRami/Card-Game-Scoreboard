import { TableCell, TableRow } from '@/components/ui/table';
import { RoundCell } from './round-cell';
import { AiAdvice } from './ai-advice';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Player, RoundScore } from '@/lib/kachufolio';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { memo } from 'react';

interface PlayerRowProps {
  player: Player;
  playerScores: RoundScore[];
  totalScore: number;
  updateBid: (playerId: string, roundIndex: number, bid: number) => void;
  updateTaken: (playerId: string, roundIndex: number, taken: number) => void;
  removePlayer: (playerId: string) => void;
  gameRounds: number[];
}

function PlayerRowComponent({ player, playerScores, totalScore, updateBid, updateTaken, removePlayer, gameRounds }: PlayerRowProps) {
  return (
    <TableRow className="hover:bg-muted/20">
      <TableCell className="sticky left-0 bg-card z-10 font-medium group text-left p-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{player.name}</span>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePlayer(player.id)}
                aria-label={`Remove ${player.name}`}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      </TableCell>
      {playerScores.map((score, index) => (
        <RoundCell
          key={index}
          score={score}
          playerId={player.id}
          roundIndex={index}
          onBidChange={updateBid}
          onTakenChange={updateTaken}
        />
      ))}
      <TableCell className="sticky right-0 bg-card z-10 text-center">
        <div className="flex items-center justify-center gap-2">
          <Badge variant={totalScore > 0 ? "default" : "secondary"} className="text-sm font-bold bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-foreground/80">
            {totalScore}
          </Badge>
          <AiAdvice player={player} scores={playerScores} totalScore={totalScore} gameRounds={gameRounds} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export const PlayerRow = memo(PlayerRowComponent);
