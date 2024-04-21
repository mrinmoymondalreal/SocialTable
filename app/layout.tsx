import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-[#262626] dark:text-white min-h-screen">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
          <Header/>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
