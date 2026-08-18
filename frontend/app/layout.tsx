import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kouvénta Portal",
  description: "Kouventa Portal Mock Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-kouventa-bg text-white antialiased">{children}</body>
    </html>
  );
}