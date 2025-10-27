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
    reviews: [
  {
    authorName: "María López",
    rating: 5,
    text: "Excelente lugar, los croissants son espectaculares. Atención muy amable y ambiente cálido.",
    relativeTimeDescription: "hace 2 semanas",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    authorName: "Carlos Gómez",
    rating: 4,
    text: "Muy buen café y pastelería. A veces cuesta conseguir mesa.",
    relativeTimeDescription: "hace 1 mes",
    profilePhotoUrl: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    authorName: "Lucía Fernández",
    rating: 5,
    text: "De mis lugares favoritos en Recoleta, siempre frescos los productos.",
    relativeTimeDescription: "hace 3 meses",
    profilePhotoUrl: "https://randomuser.me/api/portraits/women/42.jpg"
  }
],
    images: [
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300",
      "https://picsum.photos/300/300"
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
          closeTime: "18:00"
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
