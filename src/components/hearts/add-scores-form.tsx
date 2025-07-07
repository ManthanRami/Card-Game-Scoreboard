'use client';

import { useState } from 'react';
import type { Player } from '@/lib/kachufolio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle, Rocket } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface AddScoresFormProps {
    players: Player[];
    onAddRound: (scores: Record<string, number>) => void;
    roundNumber: number;
}

export function AddScoresForm({ players, onAddRound, roundNumber }: AddScoresFormProps) {
    const [scores, setScores] = useState<Record<string, string>>({});
    const [moonShooterId, setMoonShooterId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleScoreChange = (playerId: string, value: string) => {
        setScores(prev => ({ ...prev, [playerId]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const roundScores: Record<string, number> = {};

        if(moonShooterId) {
            for(const player of players) {
                roundScores[player.id] = player.id === moonShooterId ? 0 : 26;
            }
            onAddRound(roundScores);
            setScores({});
            setMoonShooterId(null);
            return;
        }

        const parsedScores = players.map(p => parseInt(scores[p.id] || '0', 10));

        if(parsedScores.some(p => isNaN(p))) {
            toast({ variant: 'destructive', title: 'Invalid Scores', description: 'Please enter a valid number for each player.' });
            return;
        }

        const totalScore = parsedScores.reduce((sum, score) => sum + score, 0);
        if (totalScore !== 26) {
             toast({ variant: 'destructive', title: 'Incorrect Total Score', description: `The scores must add up to 26, but they add up to ${totalScore}.` });
             return;
        }

        for(const player of players) {
            roundScores[player.id] = parseInt(scores[player.id], 10);
        }

        onAddRound(roundScores);
        setScores({});
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enter Scores for Round {roundNumber}</CardTitle>
                <CardDescription>
                    Input the points each player took this round. The total must be 26.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                     <div>
                        <Label className="flex items-center gap-2 mb-3 font-semibold"><Rocket/> Did someone Shoot the Moon?</Label>
                        <RadioGroup onValueChange={(value) => setMoonShooterId(value === 'none' ? null : value)} value={moonShooterId ?? 'none'}>
                             <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center">
                                {players.map(player => (
                                    <div key={player.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={player.id} id={`moon-${player.id}`} />
                                        <Label htmlFor={`moon-${player.id}`}>{player.name}</Label>
                                    </div>
                                ))}
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="moon-none" />
                                    <Label htmlFor="moon-none">No</Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    {!moonShooterId && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {players.map(player => (
                                <div key={player.id} className="space-y-2">
                                    <Label htmlFor={`score-${player.id}`}>{player.name}</Label>
                                    <Input
                                        id={`score-${player.id}`}
                                        type="number"
                                        min="0"
                                        max="26"
                                        value={scores[player.id] || ''}
                                        onChange={(e) => handleScoreChange(player.id, e.target.value)}
                                        placeholder="Points"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {moonShooterId && (
                         <Alert variant="default" className="bg-accent/50 border-accent">
                          <Rocket className="h-4 w-4" />
                          <AlertTitle>Shooting the Moon!</AlertTitle>
                          <AlertDescription>
                            {players.find(p => p.id === moonShooterId)?.name} will get 0 points, and all other players will get 26.
                          </AlertDescription>
                        </Alert>
                    )}

                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Round Scores
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
