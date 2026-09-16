import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // 研習工作坊頁已移除，舊連結導回首頁
    return [{ source: "/workshop", destination: "/", permanent: true }];
  },
};

export default nextConfig;
