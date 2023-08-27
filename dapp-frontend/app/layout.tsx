import "styles/globals.css";
import { ReactNode } from "react";
import Providers from "./Providers";
import { Inter } from "next/font/google";
import { Footer, Header } from "components";
import type { Metadata } from "next";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "The Dapp List Blogs",
  description: "Generates by dapps list",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow py-[40px]">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
