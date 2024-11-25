import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leo Felcianas | DevOps Engineer",
  description: "Associate DevOps Engineer @Empite | Software Engineer specializing in infrastructure as code and cloud technologies",
  icons: {
    icon: [
      {
        url: '/icon?<generated>',
        type: 'image/png',
      },
    ],
    shortcut: ['/icon?<generated>'],
    apple: [
      {
        url: '/icon?<generated>',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
