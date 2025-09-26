"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const goToLanding = async () => {
      try {
        const res = await fetch("/api/business")
        if (!res.ok) {
          console.error("Error al obtener negocios:", res.statusText)
          return
        }

        const list = await res.json()
        if (Array.isArray(list) && list.length > 0 && list[0].id) {
          router.replace(`/landing/${list[0].id}`)
        } else {
          console.warn("No se encontró ningún negocio.")
        }
      } catch (error) {
        console.error("Error en fetch /api/business:", error)
      }
    }

    goToLanding()
  }, [router])

  return (
    <main className="flex justify-center items-center h-screen">
      <p>Redirigiendo a tu landing...</p>
    </main>
  )
}
