import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./_components/SideBar";
const inter = Inter({ subsets: ["latin"] });
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import Link from 'next/link'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Suspense >
          <SideBar>
            {children}
          </SideBar>
        </Suspense>
      </body>
    </html>
  );
}
