'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Player } from '@/lib/kachufolio';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { AddScoresForm } from './add-scores-form';
import { Badge } from '../ui/badge';
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface HeartsScoreboardProps {
  players: Player[];
  scores: Record<string, number[]>;
  totals: Record<string, number>;
  onAddRound: (scores: Record<string, number>) => void;
  isGameOver: boolean;
  winner: Player | null;
}

export function HeartsScoreboard({ players, scores, totals, onAddRound, isGameOver, winner }: HeartsScoreboardProps) {
  const numRounds = players.length > 0 ? (scores[players[0].id]?.length || 0) : 0;
  
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                 <CardTitle className="p-4 pb-0">Scoreboard</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="w-full overflow-auto rounded-lg border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[150px] font-semibold text-left">Player</TableHead>
                            {Array.from({ length: numRounds }).map((_, i) => (
                                <TableHead key={i} className="text-center">Round {i + 1}</TableHead>
                            ))}
                            <TableHead className="text-center font-semibold w-[100px]">Total</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {players.map(player => (
                            <TableRow key={player.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold">{player.name}</span>
                                    </div>
                                </TableCell>
                                {Array.from({ length: numRounds }).map((_, i) => (
                                    <TableCell key={i} className="text-center font-mono">
                                        {scores[player.id]?.[i] ?? '-'}
                                    </TableCell>
                                ))}
                                <TableCell className="text-center">
                                    <Badge variant={totals[player.id] >= 100 ? "destructive" : "secondary"} className="text-base font-bold">
                                        {totals[player.id]}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
        
        {isGameOver ? (
            <Card className="border-green-500 bg-green-500/10">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3 text-2xl text-green-700 dark:text-green-400">
                        <Trophy className="h-8 w-8" /> Game Over!
                    </CardTitle>
                    <CardDescription className="text-lg">
                       Congratulations, <span className="font-bold">{winner?.name}</span> wins with the lowest score!
                    </CardDescription>
                </CardHeader>
            </Card>
        ) : (
             <AddScoresForm players={players} onAddRound={onAddRound} roundNumber={numRounds + 1} />
        )}
    </div>
  );
}
