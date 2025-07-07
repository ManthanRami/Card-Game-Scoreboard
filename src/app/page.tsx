'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Gamepad2, Heart, Spade } from 'lucide-react';
import { ThemeToggle } from '@/components/kachufolio/theme-toggle';

const GameSelectionCard = ({ href, title, description, imageUrl, imageHint, icon: Icon }: { href: string; title: string; description: string; imageUrl: string; imageHint: string; icon: React.ElementType }) => {
  return (
    <Link href={href} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-primary">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={imageUrl}
              alt={`${title} game banner`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <Icon className="h-10 w-10 text-white drop-shadow-lg" />
              <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">{title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function GameHub() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Scoreboard Hub</h1>
          </div>
           <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Choose Your Game</h2>
            <p className="mt-4 text-xl text-muted-foreground">Select a scoreboard to get started.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GameSelectionCard 
              href="/kachufolio"
              title="KachuFolio"
              description="A modern scoreboard for the strategic Indian card game, Kachufol. Track bids, tricks, and scores with ease."
              imageUrl="https://placehold.co/600x400.png"
              imageHint="playing cards abstract"
              icon={Spade}
            />
            <GameSelectionCard 
              href="/hearts"
              title="Hearts"
              description="The classic trick-taking game where the goal is to score as few points as possible. Avoid hearts and the Queen of Spades!"
              imageUrl="https://placehold.co/600x400.png"
              imageHint="heart abstract red"
              icon={Heart}
            />
          </div>
        </div>
      </main>
       <footer className="text-center p-4 text-sm text-muted-foreground">
          <p>Built with modern tools for classic games.</p>
      </footer>
    </div>
  );
}
