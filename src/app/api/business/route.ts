import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { mockLocations } from "@/app/landing/[id]/mock"
import type { BusinessDTO } from "@/types/business"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify([] satisfies BusinessDTO[]), { status: 401 })
  }

  const businesses = await prisma.business.findMany({
    where: { user: { email: session.user.email } },
  })

  if (businesses.length === 0) {
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
}
