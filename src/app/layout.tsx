import "./globals.css"
import type { Metadata } from "next"
import Providers from "@/components/Providers"

export const metadata: Metadata = {
  title: "Autores - Grandes autodidactas",
  description: "Hace tu propia web gratis y en minuto. Accedé con tu cuenta de Google y generá tu web automaticamente.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
