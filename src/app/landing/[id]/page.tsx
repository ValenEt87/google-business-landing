"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function LandingPage() {
  const { id } = useParams() as { id: string }
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/business`)
        const list = await res.json()

        if (Array.isArray(list)) {
          // Buscar el negocio con el id
          const found = list.find((b) => b.id === id)
          setBusiness(found || null)
        }
      } catch (error) {
        console.error("Error fetching business:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusiness()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando landing...</p>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontró información del negocio.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{business.title}</h1>

      {business.address && <p className="mb-2">📍 {business.address}</p>}
      {business.phone && <p className="mb-2">📞 {business.phone}</p>}
      {business.website && (
        <p className="mb-2">
          🌐{" "}
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {business.website}
          </a>
        </p>
      )}

      {business.hours && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">🕒 Horarios</h2>
          <ul className="list-disc list-inside">
            {business.hours.periods?.map((p: any, idx: number) => (
              <li key={idx}>
                {p.openDay}: {p.openTime} - {p.closeTime}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
