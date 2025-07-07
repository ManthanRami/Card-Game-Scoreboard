import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { Gamepad2, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface GameHeaderProps {
  onNewGame: () => void;
}

export function GameHeader({ onNewGame }: GameHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">Kachuful</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to game selection">
              <Home />
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={onNewGame}>
            <RotateCcw className="mr-2 h-4 w-4" /> New Game
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
