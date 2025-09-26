import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { mockLocations } from "@/app/landing/[id]/mock"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { businesses: true },
    })

    if (user?.businesses?.length) {
      // ✅ Hay negocios en la DB
      return new Response(JSON.stringify(user.businesses), { status: 200 })
    }

    // ⚠️ Si no hay negocios en DB, devolvemos mockLocations
    if (mockLocations.locations?.length) {
      const mockBiz = mockLocations.locations.map((loc: any, idx: number) => ({
        id: `mock-${idx}`,
        title: loc.title,
        phone: loc.phoneNumbers?.primaryPhone || null,
        address: loc.storefrontAddress?.addressLines?.join(", ") || null,
        website: loc.websiteUri || null,
        hours: loc.regularHours || null,
      }))

      return new Response(JSON.stringify(mockBiz), { status: 200 })
    }

    return new Response(JSON.stringify([]), { status: 200 })
  } catch (error) {
    console.error("❌ Error en /api/business:", error)
    return new Response(JSON.stringify([]), { status: 500 })
  }
}
