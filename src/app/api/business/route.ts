import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { mockLocations } from "@/app/landing/[id]/mock"
import type { BusinessDTO } from "@/types/business"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    console.log("SESSION", session)

    if (!session || !session.user?.email) {
      console.warn("No session. Returning mock.")
      const mock: BusinessDTO[] = mockLocations.locations.map((loc) => ({
        id: loc.name,
        title: loc.title,
        phone: loc.phoneNumbers?.primaryPhone ?? null,
        address: loc.storefrontAddress?.addressLines?.join(", ") ?? null,
        website: loc.websiteUri ?? null,
        hours: loc.regularHours ?? null,
      }))
      return new Response(JSON.stringify(mock), { status: 200 })
    }

    const businesses = await prisma.business.findMany({
      where: { user: { email: session.user.email } },
    })

    console.log("BUSINESSES", businesses)

    if (businesses.length === 0) {
      console.warn("No businesses. Returning mock.")
      const mock: BusinessDTO[] = mockLocations.locations.map((loc) => ({
        id: loc.name,
        title: loc.title,
        phone: loc.phoneNumbers?.primaryPhone ?? null,
        address: loc.storefrontAddress?.addressLines?.join(", ") ?? null,
        website: loc.websiteUri ?? null,
        hours: loc.regularHours ?? null,
      }))
      return new Response(JSON.stringify(mock), { status: 200 })
    }

    return new Response(JSON.stringify(businesses), { status: 200 })
  } catch (error: any) {
    console.error("ERROR EN /api/business:", error)
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 })
  }
}
