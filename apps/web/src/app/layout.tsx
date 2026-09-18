import type { Metadata } from 'metadata';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DDialer | Business Communication Platform by Dial Dynamic Ltd',
  description: 'Powering Global VoIP, SMPP & AI Telephony Empires. Deploy virtual numbers, bulk SMS gateways, AI sentiment bots, and least-cost routing under your own brand identity.',
  keywords: ['Business VoIP', 'Cloud Phone System', 'Virtual Phone Numbers', 'SIP Trunking', 'Call Center Software', 'Business SMS'],
  openGraph: {
    title: 'DDialer | Enterprise Telecom OS',
    description: 'Business VoIP & Cloud Phone System Built for Modern Teams.',
    url: 'https://ddialer.xyz',
    siteName: 'DDialer OS',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#070913] text-[#8a99ad] antialiased selection:bg-[#00d2ff]/30 selection:text-white font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}