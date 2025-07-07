'use client';

import type { Player } from '@/lib/kachufolio';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Flame, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RaceVisualizationProps {
  players: Player[];
  totals: Record<string, number>;
}

export function RaceVisualization({ players, totals }: RaceVisualizationProps) {
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
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
          Race to Victory!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div 
            className="relative pr-12"
            style={{ height: `${sortedPlayers.length * 3.5}rem` }}
        >
          {sortedPlayers.map((player, index) => {
            const score = totals[player.id] || 0;
            const progress = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const isWinning = score === winningScore && winningScore > 0;

            return (
              <div 
                key={player.id} 
                className="absolute w-full h-10"
                style={{ top: `${index * 3.5}rem`}}
              >
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-muted rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute top-0 transition-all duration-500 ease-out"
                  style={{ left: `calc(${progress}% - 20px)` }}
                >
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-primary ring-2 ring-background shadow-lg bg-background">
                        <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {isWinning && (
                        <Flame className="absolute -top-2 -right-3 h-6 w-6 text-amber-500 fill-amber-400 animate-pulse drop-shadow-lg" />
                      )}
                      <span className="absolute top-11 left-1/2 -translate-x-1/2 w-max text-xs font-semibold bg-background/80 px-1.5 py-0.5 rounded shadow">
                        {player.name}
                      </span>
                    </div>
                </div>
              </div>
            );
          })}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 h-full flex items-center">
             <Trophy className="h-10 w-10 text-amber-400 stroke-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
