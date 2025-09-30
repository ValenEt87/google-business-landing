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
    <main className="max-w-5xl mx-auto py-8">
      <section className="mb-6">
        <h1 className="text-3xl text-[#1F1F1F] mb-2">{business.title}</h1>
        <div className="flex items-center gap-2 text-[#5E5E5E]">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-yellow-500">
              {business.rating ? "★".repeat(Math.floor(business.rating)) + "☆" : "★★★★☆"}
            </span>
            <span className="text-sm text-[#1A0DAB] hover:underline">
              {business.reviewCount || 315} opiniones en Google
            </span>
          </div>
          ·
          <p className="text-sm">$10,000–15,000</p>
          ·
          <p className="text-sm">{business.category || "Negocio local"}</p>
          ·          
          <p className="text-[#198639] text-sm">Abierto</p>
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
            className="w-full h-64 rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      )}

      <section className="flex flex-wrap gap-3 my-8">
        <a href="#" className="border border-[#d2d2d2] text-sm text-[#4d5156] px-4 py-2 rounded-full hover:bg-gray-100">📍 Cómo llegar</a>
        <a href="#" className="border border-[#d2d2d2] text-sm text-[#4d5156] px-4 py-2 rounded-full hover:bg-gray-100">⭐ Opiniones</a>
        <a href="#" className="border border-[#d2d2d2] text-sm text-[#4d5156] px-4 py-2 rounded-full hover:bg-gray-100">📋 Menú</a>
      </section>

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
    </main>
  )
}
