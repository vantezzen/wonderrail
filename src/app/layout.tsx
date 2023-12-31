import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { FirebaseConnectionStoreProvider } from "@/lib/firebase/FirebaseConnectionStore";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Icons from "@/components/Various/Seo/Icons";
import { DarkModeBodyProvider } from "@/components/Various/DarkMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WonderRail - Discover the smartest way to Interrail",
  description: "Discover the smartest way to Interrail",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Icons />
      </head>

      <DarkModeBodyProvider className={cn(inter.className)}>
        <FirebaseConnectionStoreProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </FirebaseConnectionStoreProvider>

        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          data-collect-dnt="true"
        />
        <noscript>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-945571393"
          strategy="afterInteractive"
        />
        <Script strategy="afterInteractive" id="gAdsSetup">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "AW-945571393");
            gtag('event', 'conversion', {'send_to': 'AW-945571393/CjrqCLC6irgYEMGM8cID'});
          `}
        </Script>
      </DarkModeBodyProvider>
    </html>
  );
}
