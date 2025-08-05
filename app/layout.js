import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SolarTech Pro - Premium Solar Products",
  description:
    "Discover high-quality solar panels, batteries, inverters, and complete solar solutions. Leading supplier of renewable energy products with expert support.",
  keywords:
    "solar panels, solar batteries, solar inverters, renewable energy, solar installation, solar products",
  openGraph: {
    title: "SolarTech Pro - Premium Solar Products",
    description:
      "Discover high-quality solar panels, batteries, inverters, and complete solar solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolarTech Pro - Premium Solar Products",
    description:
      "Discover high-quality solar panels, batteries, inverters, and complete solar solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
          {children}
        </div>
      </body>
    </html>
  );
}
