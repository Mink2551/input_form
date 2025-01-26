import type { Metadata } from "next";
import { AuthProvider } from "./Provinders";
import { Mali } from "next/font/google";
import "./globals.css";

const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin", "thai"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "SC Admission an input pages",
  description: "SC Admission",
  icons: {
    icon: "/logo_sc.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mali.variable} antialiased bg-SC_White`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
