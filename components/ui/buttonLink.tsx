import Link from 'next/link';

import { Button } from '@/components/ui/button';
import React from 'react';

interface ButtonLinkProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  href: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
