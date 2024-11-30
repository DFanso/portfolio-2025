'use client';

import { useEffect } from "react";
import { trackPageView } from "@/utils/analytics";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
