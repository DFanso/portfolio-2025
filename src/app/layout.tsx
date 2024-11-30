import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leo Felcianas | DevOps Engineer",
  description: "Associate DevOps Engineer @Empite | Software Engineer specializing in infrastructure as code and cloud technologies",
  icons: [{
    rel: 'icon',
    url: '/favicon.svg',
    type: 'image/svg+xml',
  }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
