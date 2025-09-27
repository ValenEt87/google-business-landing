"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { BusinessDTO } from "@/types/business"

export default function LandingPage() {
  const { id } = useParams() as { id: string }
  const [business, setBusiness] = useState<BusinessDTO | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return;

    const fetchBusiness = async () => {
      try {
        const res = await fetch(`/api/business`);
        const list: BusinessDTO[] = await res.json();
        const found = list.find((b) => b.id === id) || null;
        setBusiness(found);
      } catch (error) {
        console.error("Error fetching business:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) return <p>Cargando landing...</p>
  if (!business) return <p>No se encontró información del negocio.</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{business.title}</h1>
      {business.address && <p>📍 {business.address}</p>}
      {business.phone && <p>📞 {business.phone}</p>}
      {business.website && (
        <a
          href={business.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          🌐 {business.website}
        </a>
      )}
    </div>
  )
}
