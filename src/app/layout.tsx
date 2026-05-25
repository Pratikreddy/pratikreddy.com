import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratikreddy.com"),
  title: {
    default: "Pratik S Reddy | Agentic Systems + Operations",
    template: "%s | Pratik S Reddy",
  },
  description:
    "Portfolio of Pratik S Reddy, building agentic systems, automation, local-first evidence, and operations tools.",
  openGraph: {
    title: "Pratik S Reddy | Agentic Systems + Operations",
    description:
      "Portfolio of Pratik S Reddy, building agentic systems, automation, local-first evidence, and operations tools.",
    url: "https://pratikreddy.com",
    siteName: "pratikreddy.com",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pratik S Reddy | Agentic Systems + Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik S Reddy | Agentic Systems + Operations",
    description:
      "Portfolio of Pratik S Reddy, building agentic systems, automation, local-first evidence, and operations tools.",
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
