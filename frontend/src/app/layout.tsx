import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { ClientDataProvider } from "@/context/clientDataContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Run Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientDataProvider>
        <UserProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
          >
            {children}
          </body>
        </UserProvider>
      </ClientDataProvider>
    </html>
  );
}
