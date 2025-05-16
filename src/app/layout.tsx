// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Crash Out',
  description: 'Before you crash out, think it out.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-gray-100 text-gray-900 font-sans min-h-screen">
        <main className="max-w-3xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}

