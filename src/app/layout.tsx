import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KawaiCam ✨ Cute Photobooth",
  description:
    "Take cute photos with adorable props! Add kawaii stickers, hats, glasses and more to your selfies. Free online photobooth.",
  keywords: ["photobooth", "kawaii", "cute", "props", "selfie", "webcam"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📸</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
