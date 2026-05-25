import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratikreddy.com"),
  title: {
    default: "Pratik",
    template: "%s | Pratik",
  },
  description: "Pratik: resume, timeline, and suite.",
  openGraph: {
    title: "Pratik",
    description: "Resume, timeline, agent suite, and agent teams.",
    url: "https://pratikreddy.com",
    siteName: "pratikreddy.com",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pratik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik",
    description: "Resume, timeline, agent suite, and agent teams.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
