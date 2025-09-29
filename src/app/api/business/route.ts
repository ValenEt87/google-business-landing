import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { mockBusinesses } from "@/app/landing/[id]/mock"
import type { BusinessDTO } from "@/types/business"

export async function GET() {
  const session = await getServerSession(authOptions)

  console.log("SESSION", session)

  // 🔁 Si no hay sesión, devolvemos el mock
  if (!session || !session.user?.email) {
    console.warn("No session. Returning mock data.")
    return Response.json(mockBusinesses)
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { businesses: true }
    })

    if (!user || !user.businesses.length) {
      console.warn("No businesses found for user. Returning mock.")
      return Response.json(mockBusinesses)
    }

    return Response.json(user.businesses)
  } catch (error) {
    console.error("Error fetching businesses from DB:", error)
    return new Response("Server error", { status: 500 })
  }
}
