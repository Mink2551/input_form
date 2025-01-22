import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ปิดการตรวจสอบ ESLint ในระหว่างการ build
  },
  // เพิ่มการตั้งค่าอื่นๆ ที่คุณต้องการ
};

export default nextConfig;
