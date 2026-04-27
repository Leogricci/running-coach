import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { ServiceWorkerRegistrar } from "@/components/layout/ServiceWorkerRegistrar";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Running Coach",
  description: "Personal running training coach — 10K and beyond",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Running Coach",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="h-full">
        <ServiceWorkerRegistrar />
        <AuthProvider>
          <main className="h-full overflow-y-auto pb-20">{children}</main>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
