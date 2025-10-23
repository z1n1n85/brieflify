import type { Metadata } from 'next';
import './globals.css';
import { MswProvider } from './msw-provider';

if (
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' &&
  typeof window === 'undefined'
) {
  import('../mocks').then(({ initMocks }) => initMocks());
}

export const metadata: Metadata = {
  title: 'Welcome Page | Brieflify',
  description: 'Lorem Ipsum',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <MswProvider />
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
