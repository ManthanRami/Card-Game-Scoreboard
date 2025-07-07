'use client';

import type { Suit } from '@/lib/kachufolio';
import { cn } from '@/lib/utils';

interface SuitDisplayProps {
  suit: Suit | undefined;
  className?: string;
}

export function SuitDisplay({ suit, className }: SuitDisplayProps) {
  if (!suit) return null;

  if (suit === 'hearts') {
    return <span className={cn('text-xl text-red-600', className)}>♥</span>;
  }
  if (suit === 'diamonds') {
    return <span className={cn('text-xl text-red-600', className)}>♦</span>;
  }
  if (suit === 'spades') {
    return <span className={cn('text-xl text-foreground', className)}>♠</span>;
  }
  if (suit === 'clubs') {
    return <span className={cn('text-xl text-foreground', className)}>♣</span>;
  }
  return null;
}
