'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Player } from '@/lib/kachufolio';
import { AddPlayerForm } from './add-player-form';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Users, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface GameSetupProps {
  onGameSetup: (numberOfPlayers: number, numberOfDecks: number) => void;
  onAddPlayer?: (name: string) => void;
  onRemovePlayer?: (playerId: string) => void;
  onReorderPlayers?: (sourceIndex: number, destinationIndex: number) => void;
  players?: Player[];
  numberOfPlayers?: number | null;
}

export function GameSetup({ onGameSetup, onAddPlayer, onRemovePlayer, onReorderPlayers, players = [], numberOfPlayers = null }: GameSetupProps) {
  const [numPlayers, setNumPlayers] = useState<string>('4');
  const [numDecks, setNumDecks] = useState<string>('1');

  const handleSubmitConfig = (e: FormEvent) => {
    e.preventDefault();
    const playerCount = parseInt(numPlayers, 10);
    const deckCount = parseInt(numDecks, 10);
    if (!isNaN(playerCount) && playerCount >= 2 && playerCount <= 10 && !isNaN(deckCount)) {
      onGameSetup(playerCount, deckCount);
    }
  };

  // View 1: Initial game configuration
  if (!numberOfPlayers) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>New Game Setup</CardTitle>
            <CardDescription>Configure your Kachufol game.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitConfig}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="num-players">Number of Players (2-10)</Label>
                  <Input
                    id="num-players"
                    type="number"
                    min="2"
                    max="10"
                    value={numPlayers}
                    onChange={(e) => setNumPlayers(e.target.value)}
                    required
                    className="text-center text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number of Decks</Label>
                  <RadioGroup
                    value={numDecks}
                    onValueChange={setNumDecks}
                    className="flex items-center gap-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="decks-1" />
                      <Label htmlFor="decks-1" className="font-normal">1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="decks-2" />
                      <Label htmlFor="decks-2" className="font-normal">2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="decks-3" />
                      <Label htmlFor="decks-3" className="font-normal">3</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Set Up Game & Add Players</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // View 2: Add players to the configured game
  const playersNeeded = numberOfPlayers - players.length;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users /> Add Players</CardTitle>
          <CardDescription>
            The game is set for {numberOfPlayers} players. Add them below to start playing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onAddPlayer && <AddPlayerForm onAddPlayer={onAddPlayer} />}
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
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReorderPlayers?.(index, index - 1)} disabled={index === 0} aria-label="Move player up">
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReorderPlayers?.(index, index + 1)} disabled={index === players.length - 1} aria-label="Move player down">
                                <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive" onClick={() => onRemovePlayer?.(p.id)} aria-label={`Remove ${p.name}`}>
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
    </div>
  );
}
