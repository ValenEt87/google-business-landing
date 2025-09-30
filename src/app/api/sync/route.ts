import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { mockBusinesses } from "@/app/landing/[id]/mock"
import type { BusinessDTO } from "@/types/business"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
    }

    const accessToken = (session as { accessToken?: string }).accessToken
    let locationsData: { locations: any[] } | null = null

    if (accessToken) {
      const resAccounts = await fetch(
        "https://mybusinessbusinessinformation.googleapis.com/v1/accounts",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      const accountsData = await resAccounts.json()
      console.log("✅ [SYNC] Accounts data:", accountsData)

      if (accountsData?.accounts?.length) {
        const accountId = accountsData.accounts[0].name
        const resLocations = await fetch(
          `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        locationsData = await resLocations.json()
        console.log("✅ [SYNC] Locations data:", locationsData)
      }
    }

    // fallback si no hay datos reales
    // const source = locationsData?.locations?.length ? locationsData : mockLocations
    const source = locationsData?.locations?.length ? locationsData : null
      if (!source) {
        console.log("⚠️ No se encontraron negocios reales. No se guardará ningún negocio.")
        return new Response(JSON.stringify([]), { status: 200 })
      }

    const businesses: BusinessDTO[] = source.locations.map((loc: any) => ({
      id: loc.name,
      title: loc.title,
      phone: loc.phoneNumbers?.primaryPhone ?? null,
      address: loc.storefrontAddress?.addressLines?.join(", ") ?? null,
      website: loc.websiteUri ?? null,
      hours: loc.regularHours ?? null,
    }))

    for (const b of businesses) {
      await prisma.business.upsert({
        where: { id: b.id },
        update: {
          title: b.title,
          phone: b.phone,
          address: b.address,
          website: b.website,
          // hours: b.hours,
        },
        create: {
          id: b.id,
          title: b.title,
          phone: b.phone,
          address: b.address,
          website: b.website,
          // hours: b.hours,
          userId: user.id,
        },
      })
    }

    return new Response(JSON.stringify(businesses), { status: 200 })
  } catch (error) {
    console.error("❌ Error en sync:", error)
    return new Response(JSON.stringify(mockBusinesses), { status: 200 })
  }
}
