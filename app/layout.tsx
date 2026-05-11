import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import LenisProvider from "@/components/LenisProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "faja — Premium Digital Agency UK",
  description:
    "faja builds the systems that let your business operate beyond its size. Custom websites, apps, automation, and AI agents — built to their absolute limit.",
  keywords: ["digital agency", "UK", "web development", "AI agents", "automation"],
  openGraph: {
    title: "faja — Premium Digital Agency UK",
    description:
      "faja builds the systems that let your business operate beyond its size.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
