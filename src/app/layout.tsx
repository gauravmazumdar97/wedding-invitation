import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Tiro_Bangla } from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const bengali = Tiro_Bangla({
  subsets: ["bengali", "latin"],
  weight: "400",
  variable: "--font-bangla",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#2a3344" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(wedding.social.siteUrl),
  title: {
    default: `${wedding.social.title} · ${wedding.date.display}`,
    template: `%s · ${wedding.social.title}`,
  },
  description: `${wedding.social.descriptionBn} · ${wedding.social.description}`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: wedding.social.title,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: `${wedding.social.title} · ${wedding.date.display}`,
    description: wedding.social.descriptionBn,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.social.title,
    description: wedding.social.descriptionBn,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${bengali.variable} ${sans.variable}`}>
      <body className={`${sans.className} antialiased`}>{children}</body>
    </html>
  );
}
