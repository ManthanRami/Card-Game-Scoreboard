'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface GameSetupProps {
  onGameSetup: (numberOfPlayers: number) => void;
}

export function GameSetup({ onGameSetup }: GameSetupProps) {
  const [numPlayers, setNumPlayers] = useState<string>('4');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const count = parseInt(numPlayers, 10);
    if (!isNaN(count) && count >= 2 && count <= 10) { // Let's say max 10 players
      onGameSetup(count);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>New Game Setup</CardTitle>
          <CardDescription>How many players are joining the game?</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Start Game</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
