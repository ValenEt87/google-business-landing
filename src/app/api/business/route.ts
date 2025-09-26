import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { mockLocations } from "@/app/landing/[id]/mock"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify(mockLocations.locations), { status: 200 })
  }

  try {
    // Buscar negocios en la DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { businesses: true },
    })

    if (user?.businesses?.length) {
      return new Response(JSON.stringify(user.businesses), { status: 200 })
    }

    // 👉 Si no hay negocios en DB devolvemos mocks
    return new Response(JSON.stringify(mockLocations.locations), { status: 200 })
  } catch (error) {
    console.error("❌ Error en /api/business:", error)
    return new Response(JSON.stringify(mockLocations.locations), { status: 200 })
  }
}
