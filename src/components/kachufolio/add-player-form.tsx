'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => void;
}

export function AddPlayerForm({ onAddPlayer }: AddPlayerFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="New player name"
        className="flex-grow"
      />
      <Button type="submit" aria-label="Add player">
        <UserPlus className="mr-2 h-4 w-4" /> Add Player
      </Button>
    </form>
  );
}
