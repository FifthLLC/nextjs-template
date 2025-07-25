'use client';

import { HeroUIProvider } from '@heroui/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <HeroUIProvider>{children}</HeroUIProvider>
    </NuqsAdapter>
  );
}
