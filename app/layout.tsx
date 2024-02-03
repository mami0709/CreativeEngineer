import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Layout/Header";
import { NextAuthProvider } from "./lib/next-auth/provider";
import Footer from "./components/Layout/Footer";
import SideBar from "./components/SideBar";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "創造エンジニア",
  description:
    "駆け出しエンジニアを応援したい！その熱い想いだけでこのサイトを作りました",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} flex flex-col bg-gray-100`}>
        <NextAuthProvider>
          <Header />
          <div className="flex">
            <SideBar />
            <div className="flex-grow">{children}</div>
          </div>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
