import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "GreenTrade Hub",
  description: "Sustainable products supplier management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ThemeRegistry>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
