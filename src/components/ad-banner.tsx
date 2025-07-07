'use client';

import { Card } from '@/components/ui/card';

/**
 * A placeholder component for displaying advertisements.
 * In a real-world scenario, you would integrate this with an ad network like Google AdSense.
 * This component provides a visual space where ad content would be injected.
 */
export function AdBanner() {
  return (
    <div className="py-8" data-ad-placeholder>
      <Card className="w-full max-w-3xl mx-auto h-24 flex items-center justify-center bg-muted/30 border-dashed border-2">
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Advertisement
        </p>
      </Card>
    </div>
  );
}
