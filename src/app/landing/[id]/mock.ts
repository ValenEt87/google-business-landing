// src/mock/mock-business.ts
import { BusinessDTO } from "@/types/business"

export const mockBusinesses: BusinessDTO[] = [
  {
    id: "crecia-bolleria",
    title: "Crecia Bollería",
    phone: "01168715058",
    address: "Juncal 2179, C1125 Cdad. Autónoma de Buenos Aires",
    category: "Cafetería",
    rating: 4.4,
    reviewCount: 315,
    coverImage: "/mock/crecia-main.jpg",
    images: [
      "/mock/cafe.jpg",
      "/mock/pasteleria.jpg",
      "/mock/croissant.jpg",
      "/mock/tarta.jpg"
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Juncal%202179,%20Buenos%20Aires&z=15&output=embed",
    hours: {
      periods: [
        {
          openDay: "lunes",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "martes",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "miercoles",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "jueves",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "viernes",
          openTime: "08:00",
          closeTime: "20:00"
        }
      ]
    }
  },
  {
    id: "panaderia-la-espiga",
    title: "Panadería La Espiga",
    phone: "+54 11 4444 4444",
    address: "Calle Falsa 456",
    category: "Panadería",
    rating: 4.2,
    reviewCount: 198,
    coverImage: "/mock/laespiga-main.jpg",
    images: [
      "/mock/pan.jpg",
      "/mock/tortas.jpg",
      "/mock/masas.jpg",
      "/mock/galletitas.jpg"
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Calle%20Falsa%20456&z=15&output=embed",
    hours: {
      periods: [
        {
          openDay: "lunes",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "martes",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "miercoles",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "jueves",
          openTime: "08:00",
          closeTime: "20:00"
        },
        {
          openDay: "viernes",
          openTime: "08:00",
          closeTime: "20:00"
        }
      ]
    }
  }
]
