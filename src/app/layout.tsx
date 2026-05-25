import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pratikreddy.com"),
  title: {
    default: "Pratik S Reddy",
    template: "%s | Pratik S Reddy",
  },
  description:
    "Public metadata surface for Pratik S Reddy's local-first AI, automation, evidence, and agentic suite.",
  openGraph: {
    title: "Pratik S Reddy",
    description:
      "Public metadata surface for local-first AI, automation, evidence, and agentic suite work.",
    url: "https://pratikreddy.com",
    siteName: "pratikreddy.com",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
