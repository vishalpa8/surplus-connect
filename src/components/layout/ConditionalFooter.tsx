'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();

  // Don't render the footer on authentication pages
  if (pathname.startsWith('/auth')) {
    return null;
  }

  return <Footer />;
}
