import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import { FirebaseConnectionStoreProvider } from "@/lib/firebase/FirebaseConnectionStore";

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
      <body className={cn(inter.className, "dark bg-background")}>
        <FirebaseConnectionStoreProvider>
          {children}
        </FirebaseConnectionStoreProvider>
      </body>
    </html>
  );
}
