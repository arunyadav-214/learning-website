import type { Metadata } from "next";
import "./globals.css";
import "./premium-theme.css";
import ReturnHome from "./ReturnHome";
import ArunBot from "./ArunBot";
import SiteAnalytics from "./SiteAnalytics";
import CloudflareWebAnalytics from "./CloudflareWebAnalytics";

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
    <html lang="en">
      <body>
        {children}
        <ReturnHome />
        <SiteAnalytics />
        <ArunBot />
        <CloudflareWebAnalytics />
      </body>
    </html>
  );
}
