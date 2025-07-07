import { memo } from 'react';
import { TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type { RoundScore } from '@/lib/kachufolio';
import { cn } from '@/lib/utils';

interface RoundCellProps {
  score: RoundScore;
  playerId: string;
  roundIndex: number;
  onBidChange: (playerId: string, roundIndex: number, bid: number) => void;
  onTakenChange: (playerId: string, roundIndex: number, taken: number) => void;
}

function RoundCellComponent({ score, playerId, roundIndex, onBidChange, onTakenChange }: RoundCellProps) {
  const isCorrectBid = score.bid !== undefined && score.bid === score.taken;

  return (
    <TableCell className={cn(
      "text-center transition-colors p-1",
      isCorrectBid && score.bid !== undefined ? 'bg-green-500/10 dark:bg-green-400/10' : score.bid !== undefined && score.taken !== undefined ? 'bg-red-500/10 dark:bg-red-400/10' : ''
    )}>
      <div className="flex items-center justify-center gap-1">
        <Input
          type="number"
          min="0"
          className="w-9 h-7 p-1 text-center text-sm"
          placeholder="B"
          value={score.bid ?? ''}
          onChange={(e) => onBidChange(playerId, roundIndex, parseInt(e.target.value, 10))}
          aria-label="Bid"
        />
        <Input
          type="number"
          min="0"
          className="w-9 h-7 p-1 text-center text-sm"
          placeholder="T"
          value={score.taken ?? ''}
          onChange={(e) => onTakenChange(playerId, roundIndex, parseInt(e.target.value, 10))}
          aria-label="Taken"
        />
      </div>
      <div className={cn(
        "mt-1 text-xs font-bold",
        isCorrectBid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'
      )}>
        {score.bid !== undefined && score.taken !== undefined ? score.score : '-'}
      </div>
    </TableCell>
  );
}

export const RoundCell = memo(RoundCellComponent);
