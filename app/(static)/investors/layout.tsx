import { Metadata } from "next";
import Script from "next/script";

const data = {
  description:
    "The largest investors database. This list of investors includes ten thousand of different venture funds based on stage, sector and location.",
  title: "Investor Search | Simpleteam",
  url: "/investors",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.simpleteam.co"),
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: "Simpleteam",
    images: [
      {
        url: "/_static/investor-meta.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
    creator: "@simpleteamco",
    images: ["/_static/investor-meta.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script src="https://iuliia2.marbleflows.com/flows/8687" />
    </>
  );
}
