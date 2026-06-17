import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://miyzwan.github.io"),
  title: "Miyzwan | ML & Web Developer",
  description:
    "Portfolio of Dimas Dwi Ismaunnizam (Miyzwan), focused on machine learning, web development, and scalable cloud-ready products.",
  openGraph: {
    title: "Miyzwan | ML & Web Developer",
    description:
      "Apple-inspired personal portfolio featuring selected projects, technical strengths, and contact details.",
    url: "https://miyzwan.github.io",
    siteName: "Miyzwan Portfolio",
    locale: "en_US",
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
      <body>{children}</body>
    </html>
  );
}
