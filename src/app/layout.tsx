import type { Metadata } from "next";
import { Atkinson_Hyperlegible, DM_Mono } from "next/font/google";
import "./globals.css";

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-body",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const monoFont = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TBI - Noun Classifier | Persiapantubel",
  description:
    "Materi, flipcard, dan tes klasifikasi uncountable serta countable nouns yang relevan untuk latihan TOEFL, TOEIC, dan IELTS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
