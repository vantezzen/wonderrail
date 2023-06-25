import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { FirebaseConnectionStoreProvider } from "@/lib/firebase/FirebaseConnectionStore";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={cn(inter.className, "dark bg-zinc-900")}>
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
      </body>
    </html>
  );
}
