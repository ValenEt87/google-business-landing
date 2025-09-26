"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { mockLocations } from "./mock"

export default function LandingPage() {
  const { id } = useParams() as { id: string }
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/business`)
        if (!res.ok) {
          // ⚡ si la API falla, usamos mockLocations
          const fallback = mockLocations.locations.find((b) => b.name === id)
          setBusiness(fallback || null)
          return
        }

        const list = await res.json()
        if (Array.isArray(list)) {
          const found = list.find((b) => b.id === id)
          setBusiness(found || null)
        } else {
          // ⚡ si la API devuelve algo inesperado, también mock
          const fallback = mockLocations.locations.find((b) => b.name === id)
          setBusiness(fallback || null)
        }
      } catch (error) {
        console.error("Error fetching business:", error)
        const fallback = mockLocations.locations.find((b) => b.name === id)
        setBusiness(fallback || null)
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

      {business.storefrontAddress?.addressLines && (
        <p className="mb-2">📍 {business.storefrontAddress.addressLines.join(", ")}</p>
      )}
      {business.phoneNumbers?.primaryPhone && (
        <p className="mb-2">📞 {business.phoneNumbers.primaryPhone}</p>
      )}
      {business.websiteUri && (
        <p className="mb-2">
          🌐{" "}
          <a
            href={business.websiteUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {business.websiteUri}
          </a>
        </p>
      )}

      {business.regularHours && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">🕒 Horarios</h2>
          <ul className="list-disc list-inside">
            {business.regularHours.periods?.map((p: any, idx: number) => (
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
