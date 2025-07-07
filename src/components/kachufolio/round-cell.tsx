import { TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type { RoundScore } from '@/lib/kachufolio';
import { cn } from '@/lib/utils';

interface RoundCellProps {
  score: RoundScore;
  onBidChange: (bid: number) => void;
  onTakenChange: (taken: number) => void;
}

export function RoundCell({ score, onBidChange, onTakenChange }: RoundCellProps) {
  const isCorrectBid = score.bid !== undefined && score.bid === score.taken;

  return (
    <TableCell className={cn(
      "p-2 text-center transition-colors",
      isCorrectBid && score.bid !== undefined ? 'bg-green-500/10 dark:bg-green-400/10' : score.bid !== undefined && score.taken !== undefined ? 'bg-red-500/10 dark:bg-red-400/10' : ''
    )}>
      <div className="flex items-center justify-center gap-2">
        <Input
          type="number"
          min="0"
          className="w-14 h-8 p-1 text-center"
          placeholder="B"
          value={score.bid ?? ''}
          onChange={(e) => onBidChange(parseInt(e.target.value, 10))}
          aria-label="Bid"
        />
        <Input
          type="number"
          min="0"
          className="w-14 h-8 p-1 text-center"
          placeholder="T"
          value={score.taken ?? ''}
          onChange={(e) => onTakenChange(parseInt(e.target.value, 10))}
          aria-label="Taken"
        />
      </div>
      <div className={cn(
        "mt-1 text-sm font-bold",
        isCorrectBid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-500'
      )}>
        {score.bid !== undefined && score.taken !== undefined ? score.score : '-'}
      </div>
    </TableCell>
  );
}
