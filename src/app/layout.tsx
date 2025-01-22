import type { Metadata } from "next";
import { Mali } from "next/font/google";  // นำเข้า Sarabun จาก Google Fonts
import "./globals.css";

// กำหนดฟอนต์ Sarabun กับน้ำหนัก 100, 200, 300
const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin", "thai"],
  weight: ["300", "500", "700"], // ระบุน้ำหนักที่ต้องการ
});

export const metadata: Metadata = {
  title: "SC Admission an input pages",
  description: "SC Admission",
  icons: {
    icon: "/logo_sc.png",  // ไฟล์ไอคอน
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mali.variable} antialiased bg-SC_White`}>
        {children}
      </body>
    </html>
  );
}
