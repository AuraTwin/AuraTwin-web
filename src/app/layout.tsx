import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraTwin - Your Affective Digital Twin",
  description: "Understand your emotions. Transform your well-being. AuraTwin uses advanced emotion recognition to help you gain insights into your emotional patterns.",
  keywords: ["emotion recognition", "digital twin", "well-being", "mental health", "affective computing"],
  authors: [{ name: "AuraTwin Team" }],
  openGraph: {
    title: "AuraTwin - Your Affective Digital Twin",
    description: "Understand your emotions. Transform your well-being.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
