import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratikreddy.com"),
  title: {
    default: "Pratik S Reddy | Life Timeline + Systems",
    template: "%s | Pratik S Reddy",
  },
  description:
    "Personal archive for Pratik S Reddy: education, football, 080, farming, systems, and the agentic tools built around that life timeline.",
  openGraph: {
    title: "Pratik S Reddy | Life Timeline + Systems",
    description:
      "A personal archive for education, football, 080, farming, systems, and the public-safe evidence layer around Pratik S Reddy's work.",
    url: "https://pratikreddy.com",
    siteName: "pratikreddy.com",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pratik S Reddy | Life Timeline + Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik S Reddy | Life Timeline + Systems",
    description:
      "A personal archive for education, football, 080, farming, systems, and public-safe evidence.",
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
