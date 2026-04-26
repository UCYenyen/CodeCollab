import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainSpark — The Brain Game Kids Actually Love",
  description:
    "Science-backed games that feel like play. Track progress with detailed reports while they build essential cognitive skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased overflow-x-hidden", nunito.variable, geistMono.variable)}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-muted">
        <Toaster
          toastOptions={{ descriptionClassName: "text-card-foreground" }}
          theme="light"
          position="bottom-right"
          richColors
          closeButton
        />
        {children}
      </body>
    </html>
  );
}
