import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraTwin - Your Affective Digital Twin",
  description: "Understand your emotions. Transform your well-being. AuraTwin uses advanced emotion recognition to help you gain insights into your emotional patterns.",
  keywords: ["emotion recognition", "digital twin", "well-being", "mental health", "affective computing"],
  authors: [{ name: "AuraTwin Team" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: { url: "/apple-touch-icon.png" },
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
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
    <html lang="en" suppressHydrationWarning>
      {/* Anti-flash: apply saved theme before first paint */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||( window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-200`}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <RevealObserver />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
