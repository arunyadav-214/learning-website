import type { Metadata } from "next";
import "./globals.css";
import SiteEnhancements from "./SiteEnhancements";
import HeroNameFix from "./HeroNameFix";

export const metadata: Metadata = {
  title: "Arun Learning Hub | Learn. Build. Grow.",
  description:
    "A student-built technology learning hub for practical projects, clear explanations, and hands-on growth.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">">
      <body>
        {children}
        <SiteEnhancements />
        <HeroNameFix />
      </body>
    </html>
  );
}
