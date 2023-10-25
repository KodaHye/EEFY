import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='w-full h-full'>
      <head>
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className='w-full h-full'>{children}</body>
    </html>
  );
}