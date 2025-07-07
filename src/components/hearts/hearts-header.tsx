import { Button } from '@/components/ui/button';
import { Heart, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../kachufolio/theme-toggle';

interface HeartsHeaderProps {
  onNewGame: () => void;
}

export function HeartsHeader({ onNewGame }: HeartsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-red-500 fill-red-500" />
          <h1 className="text-2xl font-bold tracking-tight">Hearts</h1>
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
