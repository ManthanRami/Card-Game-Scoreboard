'use client';

import type { Player } from '@/lib/kachufolio';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Flame, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';

interface RaceVisualizationProps {
  players: Player[];
  totals: Record<string, number>;
}

function RaceVisualizationComponent({ players, totals }: RaceVisualizationProps) {
  if (players.length < 1) {
    return null;
  }

  const scores = players.map(player => totals[player.id] || 0);
  const maxScore = Math.max(...scores, 50); // Minimum track length of 50 points to have some space
  const winningScore = Math.max(0, ...scores);
  
  if (winningScore === 0) {
    return null;
  }

  const sortedPlayers = [...players].sort((a, b) => (totals[b.id] || 0) - (totals[a.id] || 0));

  return (
    <Card className="mb-6">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold tracking-tight flex items-center justify-center gap-2">
          Race to Victory!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div 
            className="relative pr-10"
            style={{ height: `${sortedPlayers.length * 2.5}rem` }}
        >
          {sortedPlayers.map((player, index) => {
            const score = totals[player.id] || 0;
            const progress = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const isWinning = score === winningScore && winningScore > 0;

            return (
              <div 
                key={player.id} 
                className="absolute w-full h-8"
                style={{ top: `${index * 2.5}rem`}}
              >
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-muted rounded-full">
                  <div 
                    className="h-1.5 bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute top-0 transition-all duration-500 ease-out"
                  style={{ left: `calc(${progress}% - 16px)` }}
                >
                    <div className="relative">
                      <Avatar className="h-8 w-8 border-2 border-primary ring-2 ring-background shadow-lg bg-background">
                        <AvatarFallback className="text-xs">{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {isWinning && (
                        <Flame className="absolute -top-1.5 -right-2 h-4 w-4 text-amber-500 fill-amber-400 animate-pulse drop-shadow-lg" />
                      )}
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 w-max text-xs font-semibold bg-background/80 px-1.5 py-0.5 rounded shadow">
                        {player.name}
                      </span>
                    </div>
                </div>
              </div>
            );
          })}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 h-full flex items-center">
             <Trophy className="h-6 w-6 text-amber-400 stroke-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const RaceVisualization = memo(RaceVisualizationComponent);
