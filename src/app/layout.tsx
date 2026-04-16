import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Akshaya Tritiya Donation 2026",
  description: "Responsive frontend clone of the Akshaya Tritiya donation page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
