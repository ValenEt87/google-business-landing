// src/types/business.ts
export interface BusinessDTO {
  id: string
  title: string
  phone?: string | null
  address?: string | null
  category?: string
  rating?: number
  reviewCount?: number
  coverImage?: string
  images?: string[]
  mapEmbedUrl?: string
  hours?: {
    periods: {
      openDay: string
      openTime: string
      closeTime: string
    }[]
  } | null
}
