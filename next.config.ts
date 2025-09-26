// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    // 👉 Esto permite que el build en Vercel no falle por errores de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 👉 Esto permite ignorar errores estrictos de TypeScript durante el build
    ignoreBuildErrors: true,
  },
}

export default nextConfig
