'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getAiAdvice } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Player, RoundScore } from '@/lib/kachufolio';

interface AiAdviceProps {
  player: Player;
  scores: RoundScore[];
  totalScore: number;
  gameRounds: number[];
}

export function AiAdvice({ player, scores, totalScore, gameRounds }: AiAdviceProps) {
  const [isPending, startTransition] = useTransition();
  const [advice, setAdvice] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetAdvice = () => {
    startTransition(async () => {
      const biddingHistory = scores
        .map((s, i) => {
          if ((s.bid === undefined && s.taken === undefined) || gameRounds[i] === undefined) return null;
          return `Round ${i + 1} (${gameRounds[i]} cards): Bid ${s.bid ?? 'N/A'}, Took ${s.taken ?? 'N/A'}`;
        })
        .filter(Boolean)
        .join('. ');

      if (!biddingHistory) {
        toast({
          variant: "default",
          title: "Not enough data",
          description: "Play a few rounds to get advice.",
        });
        return;
      }

      const result = await getAiAdvice({
        currentScore: totalScore,
        biddingHistory,
      });

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
        setAdvice(null);
      } else {
        setAdvice(result.advice ?? 'No advice available.');
      }
    });
  };

  return (
    <Popover onOpenChange={() => setAdvice(null)}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent" onClick={handleGetAdvice} aria-label="Get AI Advice">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>AI Coach</AlertTitle>
          <AlertDescription>
            {advice || "Click the button again to get advice."}
          </AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  );
}
