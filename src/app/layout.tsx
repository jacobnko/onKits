// 루트 레이아웃 - html/body, 폰트, Header/Footer를 구성 (현재 한국어 단일 로케일)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnKits — 모두의 스마트 실무 키트",
  description: "설치 없이 브라우저에서 끝내는 모두의 스마트 실무 키트",
  other: {
    "google-adsense-account": "ca-pub-8787171365157933",
  },
  verification: {
    google: "40JXLaze7rp-uQVSD7ks5KVUfKv3stviD-bBXQmXD_s",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8787171365157933"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {process.env.NEXT_PUBLIC_KAKAO_JS_KEY && (
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
            integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
