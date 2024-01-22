import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Layout/Header";
import { NextAuthProvider } from "./lib/next-auth/provider";
import Footer from "./components/Layout/Footer";

const notoSansJP = Noto_Sans_JP({ weight: "400", subsets: ["latin"] });

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
      <body className={`${notoSansJP.className} min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
