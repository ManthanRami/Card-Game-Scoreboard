'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface GameSetupProps {
  onGameSetup: (numberOfPlayers: number, numberOfDecks: number) => void;
}

export function GameSetup({ onGameSetup }: GameSetupProps) {
  const [numPlayers, setNumPlayers] = useState<string>('4');
  const [numDecks, setNumDecks] = useState<string>('1');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const playerCount = parseInt(numPlayers, 10);
    const deckCount = parseInt(numDecks, 10);
    if (!isNaN(playerCount) && playerCount >= 2 && playerCount <= 10 && !isNaN(deckCount)) {
      onGameSetup(playerCount, deckCount);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>New Game Setup</CardTitle>
          <CardDescription>Configure your Kachufol game.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full">Start Game</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
