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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <section className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.title}</h1>
        <p className="text-gray-500">{business.category || "Negocio local"}</p>
        <div className="flex justify-center items-center mt-2 space-x-2">
          <span className="text-yellow-500">
            {business.rating ? "★".repeat(Math.floor(business.rating)) + "☆" : "★★★★☆"}
          </span>
          <span className="text-sm text-gray-500">
            ({business.reviewCount || 315} opiniones en Google)
          </span>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {business.coverImage && (
          <img src={business.coverImage} alt={business.title} className="rounded-md col-span-2 sm:col-span-4" />
        )}
        {business.images?.map((img, index) => (
          <img key={index} src={img} alt={`Imagen ${index + 1}`} className="rounded-md" />
        ))}
      </section>

      {business.mapEmbedUrl && (
        <section className="mb-6">
          <iframe
            src={business.mapEmbedUrl}
            className="w-full h-64 rounded-md border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      )}

      <section className="space-y-3 text-gray-800">
        {business.address && (
          <p>
            <strong>Dirección:</strong> {business.address}
          </p>
        )}
        {business.phone && (
          <p>
            <strong>Teléfono:</strong>{" "}
            <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
              {business.phone}
            </a>
          </p>
        )}
        <p><strong>Horario:</strong> Abierto · Cierra a las 20:00</p>
      </section>

      <section className="flex flex-wrap gap-3 mt-8">
        <a href="#" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200">📍 Cómo llegar</a>
        <a href="#" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200">⭐ Opiniones</a>
        <a href="#" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200">📋 Menú</a>
      </section>
    </main>
  )
}
