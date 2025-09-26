// src/types/business.ts
export interface BusinessDTO {
  id: string
  title: string
  phone?: string | null
  address?: string | null
  website?: string | null
  hours?: {
    periods: {
      openDay: string
      openTime: string
      closeTime: string
    }[]
  } | null
}
