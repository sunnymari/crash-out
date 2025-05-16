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
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-sans min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 mx-4">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">💥 Crash Out</h1>
          <p className="text-center text-gray-600 mb-6">Before you crash out, think it out.</p>
          {children}
        </div>
      </body>
    </html>
  );
}
