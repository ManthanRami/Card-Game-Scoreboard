'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AddPlayerForm } from './add-player-form';
import type { Player } from '@/lib/kachufolio';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Users } from 'lucide-react';

interface KachufolioGameSetupProps {
    players: Player[];
    onAddPlayer: (name: string) => void;
    numberOfPlayers: number;
}

export function KachufolioGameSetup({ players, onAddPlayer, numberOfPlayers }: KachufolioGameSetupProps) {
  const playersNeeded = numberOfPlayers - players.length;

  return (
     <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> KachuFolio Game Setup</CardTitle>
                <CardDescription>
                    The game is set for {numberOfPlayers} players. Add them below to begin.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <AddPlayerForm onAddPlayer={onAddPlayer} />
                    <div className="space-y-2 pt-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Players Joined ({players.length}/{numberOfPlayers})</h3>
                        {players.length > 0 ? (
                            <ul className="space-y-2">
                                {players.map(p => (
                                    <li key={p.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{p.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-center py-4 text-muted-foreground">No players have joined yet.</p>
                        )}
                    </div>
                </div>
            </CardContent>
            {players.length < numberOfPlayers && (
                <CardFooter>
                    <p className="text-sm text-muted-foreground w-full text-center">
                        Waiting for {playersNeeded} more player{playersNeeded > 1 ? 's' : ''}.
                    </p>
                </CardFooter>
            )}
        </Card>
     </div>
  );
}
