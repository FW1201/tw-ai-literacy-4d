import Image from "next/image";

/**
 * 站台標誌：作者吳奇的品牌徽章（金色書本 × 放大鏡 × 節點環）。
 * 不使用 Anthropic 的標誌——本站是獨立的教學資源，不是 Anthropic 產品。
 */
export function Mark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo.png"
      alt=""
      width={size}
      height={size}
      priority
      className={`mark shrink-0 rounded-full ${className}`}
    />
  );
}
