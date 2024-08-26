import "./globals.css";
import type { Metadata } from "next";

import Web3 from "@/app/web3";
import Common from "@/app/common";
import Footer from "@/components/footer";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

//local font
import localFont from "next/font/local";
const furoreFont = localFont({
  src: "../public/FuroreFont.otf",
  variable: "--font-furore",
});

import { Source_Code_Pro, Lato } from "next/font/google";

// uncommet to use online google font
const source_code_pro = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-source",
});

const lato = Lato({
  weight: ["900", "100", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "NFTSpace - Leading NFT Marketplace for Buy & Sell NFT's",
  description:
    "We're the #1 Polygon NFT marketplace for building communities & monetizing content. Explore, buy & sell NFTs on NFT Space today!",
};

import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

const GTM_ID = "GTM-5V3ZMQGV";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Script id="gtm" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
      </Script> */}

      <GoogleTagManager gtmId="GTM-MXQ8NZMH" />
      <body className={`${lato.className}`}>
        {/* <body className={furoreFont.className}> */}
        {/* <body className={`${furoreFont.variable} font-furore`}> */}
        <Providers>
          <Common>
            <Web3>
              <Toaster />
              <Navbar />
              {children}
              {/* <Footer /> */}
            </Web3>
          </Common>
        </Providers>
      </body>
    </html>
  );
}
