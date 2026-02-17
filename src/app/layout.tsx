import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Leapmotor Golemo Kraków - Konfigurator',
  description: 'Skonfiguruj i zamów swój samochód elektryczny Leapmotor online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
