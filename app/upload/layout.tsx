import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Upload",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return <>{children}</>;
}