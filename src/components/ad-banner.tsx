'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';

/**
 * A component for displaying Google AdSense advertisements.
 * This is where you would integrate your ad code.
 */
export function AdBanner() {
  // IMPORTANT: Replace these with your actual AdSense values
  const adClient = "ca-pub-XXXXXXXXXXXXXXXX"; // Your AdSense Publisher ID
  const adSlot = "1234567890"; // Your Ad Unit Slot ID

  useEffect(() => {
    // We only want to run the ad script if we're in production and have real IDs
    if (adClient !== "ca-pub-XXXXXXXXXXXXXXXX") {
        try {
            // This is the script that Google provides to display the ad.
            // We run it in a useEffect to ensure it executes on the client-side after the component has mounted.
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }
  }, []);

  // During development or if you haven't added your IDs yet, we'll show a placeholder.
  // This prevents errors and makes it clear where the ad will go.
  if (adClient === "ca-pub-XXXXXXXXXXXXXXXX") {
      return (
        <div className="py-8" data-ad-placeholder>
            <Card className="w-full max-w-3xl mx-auto h-24 flex items-center justify-center bg-muted/30 border-dashed border-2">
                <p className="text-sm text-muted-foreground tracking-widest uppercase">
                Advertisement Placeholder
                </p>
            </Card>
        </div>
      );
  }

  // This is the actual ad unit that will be displayed.
  return (
    <div className="py-8 text-center" data-ad-container>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        aria-label="Advertisement"
      ></ins>
    </div>
  );
}
