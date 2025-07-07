'use client';

import type { Player } from '@/lib/kachufolio';
import { AddPlayerForm } from './add-player-form';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Users, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PlayerEntryFormProps {
    players: Player[];
    numberOfPlayers: number;
    onAddPlayer: (name: string) => void;
    onRemovePlayer: (playerId: string) => void;
    onReorderPlayers: (sourceIndex: number, destinationIndex: number) => void;
}

export function PlayerEntryForm({ players, numberOfPlayers, onAddPlayer, onRemovePlayer, onReorderPlayers }: PlayerEntryFormProps) {
    const playersNeeded = numberOfPlayers - players.length;

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Add Players</CardTitle>
                <CardDescription>
                    The game is set for {numberOfPlayers} players. Add them below to start playing.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <AddPlayerForm onAddPlayer={onAddPlayer} />
                    <div className="space-y-2 pt-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Players Joined ({players.length}/{numberOfPlayers})</h3>
                        {players.length > 0 ? (
                            <ul className="space-y-2">
                                {players.map((p, index) => (
                                    <li key={p.id} className="flex items-center justify-between gap-3 p-2 rounded-md bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>{p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{p.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReorderPlayers(index, index - 1)} disabled={index === 0} aria-label="Move player up">
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReorderPlayers(index, index + 1)} disabled={index === players.length - 1} aria-label="Move player down">
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive" onClick={() => onRemovePlayer(p.id)} aria-label={`Remove ${p.name}`}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-center py-4 text-muted-foreground">No players have joined yet.</p>
                        )}
                    </div>
                </div>
            </CardContent>
            {playersNeeded > 0 && (
                <CardFooter>
                    <p className="text-sm text-muted-foreground w-full text-center">
                        Waiting for {playersNeeded} more player{playersNeeded > 1 ? 's' : ''}.
                    </p>
                </CardFooter>
            )}
        </Card>
    );
}
