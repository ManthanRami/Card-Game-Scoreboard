'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface HeartsInitialSetupProps {
  onGameSetup: (numberOfPlayers: number) => void;
}

export function HeartsInitialSetup({ onGameSetup }: HeartsInitialSetupProps) {
  const [numPlayers, setNumPlayers] = useState<string>('4');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const count = parseInt(numPlayers, 10);
    // Hearts is typically 3-5 players.
    if (!isNaN(count) && count >= 3 && count <= 5) {
      onGameSetup(count);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>New Hearts Game</CardTitle>
          <CardDescription>How many players are joining? (3-5)</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="num-players">Number of Players</Label>
              <Input
                id="num-players"
                type="number"
                min="3"
                max="5"
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
