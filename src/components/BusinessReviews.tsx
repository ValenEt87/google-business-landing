import React from "react"

type Review = {
  authorName: string
  rating: number
  text: string
  relativeTimeDescription: string
  profilePhotoUrl?: string
}

type Props = { reviews?: Review[] }

export default function BusinessReviews({ reviews = [] }: Props) {
  if (!reviews.length) return null

  return (
    <section className="my-24">
      <h2 className="text-3xl mb-4">Reseñas</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.slice(0, 4).map((r, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-4 transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={r.profilePhotoUrl || "/mock/avatar-placeholder.png"}
                alt={r.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{r.authorName}</p>
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(Math.floor(r.rating)) + "☆".repeat(5 - Math.floor(r.rating))}
                  </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-1 line-clamp-3">{r.text}</p>
            <p className="text-xs text-gray-500">{r.relativeTimeDescription}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
