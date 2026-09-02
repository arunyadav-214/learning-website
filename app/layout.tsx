import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "About | Arun Learning Hub",
  description:
    "Meet Arun Learning Hub, a student-built platform for practical, project-based technology learning.",
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
      <body>{children}</body>
    </html>
  );
}
