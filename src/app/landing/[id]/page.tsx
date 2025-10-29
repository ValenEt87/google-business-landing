"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { BusinessDTO } from "@/types/business"
import BusinessHoursCard from "@/components/BusinessHoursCard"
import BusinessReviews from "@/components/BusinessReviews"
import BusinessHeader from "@/components/BusinessHeader"

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
    <main className="max-w-6xl mx-auto py-8">
      <BusinessHeader
        title="Cafetería"
        whatsappUrl="https://wa.me/+5492392611482"
        instagramUrl="https://www.instagram.com/creciabolleria/"
        websiteUrl="#"
      />
      <section className="mb-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl text-[#1F1F1F] mb-2">{business.title}</h1>

          {/* Botones de redes */}
          {/* <div className="flex gap-3">
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              </svg>
            </a>
          </div> */}
        </div>

        {/* Rating + detalles */}
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

      {/* <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {business.coverImage && (
          <img src={business.coverImage} alt={business.title} className="rounded-md col-span-2 sm:col-span-4" />
        )}
        {business.images?.map((img, index) => (
          <img key={index} src={img} alt={`Imagen ${index + 1}`} className="rounded-md" />
        ))}
      </section> */}
      {/* <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {business.images?.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-xl">
            <img
              src={img}
              alt={`Imagen ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        ))}
      </section> */}

      <section className="mb-8">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Izquierda: imagen grande formato horizontal */}
          <div className="lg:w-1/2 overflow-hidden rounded-lg aspect-[3/2]">
            {business.images?.[0] && (
              <img
                src={business.images[0]}
                alt="Imagen principal"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            )}
          </div>

          {/* Derecha: 2 arriba horizontales + 3 abajo cuadradas */}
          <div className="lg:w-1/2 flex flex-col gap-2">
            {/* Fila superior (2 imágenes horizontales) */}
            <div className="grid grid-cols-2 gap-2">
              {[business.images?.[1], business.images?.[2]].map((img, idx) => (
                <div
                  key={`top-${idx}`}
                  className="overflow-hidden rounded-lg bg-stone-100 aspect-[3/2]"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={`Imagen superior ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100" />
                  )}
                </div>
              ))}
            </div>

            {/* Fila inferior (3 imágenes más cuadradas) */}
            <div className="grid grid-cols-3 gap-2">
              {[business.images?.[3], business.images?.[4], business.images?.[5]].map(
                (img, idx) => (
                  <div
                    key={`bottom-${idx}`}
                    className="overflow-hidden rounded-lg bg-stone-100 aspect-square"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`Imagen inferior ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-2 mb-8">
        {/* Mostrar solo 3 imágenes */}
        {/* {business.images?.slice(0, 3).map((img, index) => (
          <div key={index} className="overflow-hidden rounded-xl">
            <img
              src={img}
              alt={`Imagen ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        ))} */}

          {/* Card Horarios */}
          {/* <div className="flex flex-col justify-between rounded-xl p-4 bg-stone-100 hover:bg-stone-200">
            <p className="text-sm text-gray-600">Horario de atención</p>
            <div className="">
              <p className="text-[#198639] font-medium text-xl">Abierto</p>
              <p className="text-xs text-gray-600">Cierra a las 8 p.m.</p>
            </div>
          </div> */}

          {/* Card Opiniones */}
          <div className="flex flex-col justify-between rounded-xl p-4 bg-stone-100 hover:bg-stone-200">
            <p className="text-sm text-gray-600">Opiniones</p>
            <div className="">
              <p className="text-[#1F1F1F] font-medium flex items-center gap-1 text-2xl">
                4.4 <span className="text-yellow-500 text-lg">★★★★☆</span>
              </p>
              <p className="text-xs text-gray-600">{business.reviewCount || 314} opiniones</p>
            </div>
          </div>

          <BusinessHoursCard business={business} />

          <div className="flex flex-col justify-between rounded-xl p-4 bg-stone-100 hover:bg-stone-200">
            <p className="text-sm text-gray-600">Horario de mayor concurrencia</p>
            <div className="">
              <p className="text-[#1F1F1F] font-medium flex items-center gap-1 text-2xl">
                5 p.m <span className="text-yellow-500 text-lg"></span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl p-4 bg-stone-100 hover:bg-stone-200">
            <p className="text-sm text-gray-600">Contacto</p>
            <div className="">
              <p className="text-[#1F1F1F] font-medium flex items-center gap-1 text-2xl">
                💬
              </p>
            </div>
          </div>

      </section>

      <BusinessReviews reviews={business.reviews} />
      
      <div className="flex items-center gap-2">
        <section className="space-y-3 text-gray-800 w-1/2">
          <h2 className="text-3xl mb-4">Información</h2>
          {/* <p>Crecia Bollería es una panadería y cafetería de especialidad ubicada en el barrio de Recoleta, en la Ciudad  Autónoma de Buenos Aires. Su dirección es Juncal 2179, en la esquina con Azcuénaga. Se especializan en bollería, panadería y pastelería. 
          </p> */}
          {business.address && (
            <p> 
              💬 {business.address}
            </p>
          )}
          {business.phone && (
            <p>
              💬{" "}
              <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                {business.phone}
              </a>
            </p>
          )}
          <p>💬 Abierto · Cierra a las 20:00</p>
        </section>

        {business.mapEmbedUrl && (
          <section className="mb-6 w-1/2">
            <iframe
              src={business.mapEmbedUrl}
              className="w-full h-80 rounded-lg"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        )}
      </div>
    </main>
  )
}
