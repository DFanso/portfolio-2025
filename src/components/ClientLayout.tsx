'use client';

import { useEffect } from "react";
import { trackPageView } from "@/utils/analytics";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    trackPageView(pathname);
  }, [pathname]);

  return (
    <ThemeProvider>
      <body className={className}>
        {children}
      </body>
    </ThemeProvider>
  );
}
