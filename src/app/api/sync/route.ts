 import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

const mockLocations = {
  locations: [
    {
      name: "mock-1",
      title: "Pizzería Don Pepe",
      storefrontAddress: { addressLines: ["Av. Siempre Viva 123"], locality: "Buenos Aires" },
      phoneNumbers: { primaryPhone: "+54 11 5555 5555" },
      regularHours: {
        periods: [
          { openDay: "MONDAY", openTime: "11:00", closeTime: "23:00" },
          { openDay: "TUESDAY", openTime: "11:00", closeTime: "23:00" },
          { openDay: "WEDNESDAY", openTime: "11:00", closeTime: "23:00" },
        ],
      },
      websiteUri: "https://pizzeriadonpepe.com",
    },
  ],
}

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 })
  }

  const accessToken = (session as any).accessToken as string | undefined

  // usuario
  const dbUser = await prisma.user.upsert({
    where: { email: session.user.email },
    update: { name: session.user.name ?? null, image: session.user.image ?? null },
    create: { email: session.user.email, name: session.user.name ?? null, image: session.user.image ?? null },
  })

  // intenta real; si no, mock
  let locationsData: any = null

  try {
    if (accessToken) {
      const headers = { Authorization: `Bearer ${accessToken}` }
      const resAcc = await fetch("https://mybusinessbusinessinformation.googleapis.com/v1/accounts", { headers })
      const accounts = await resAcc.json()

      if (accounts?.accounts?.length) {
        const accountId = accounts.accounts[0].name
        const resLoc = await fetch(
          `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
          { headers }
        )
        locationsData = await resLoc.json()
      }
    }
  } catch (e) {
    // cae a mock
  }

  if (!locationsData?.locations?.length) {
    locationsData = mockLocations
  }

  for (const loc of locationsData.locations) {
    await prisma.business.upsert({
      where: { id: loc.name ?? `${dbUser.id}-${loc.title}` },
      update: {
        title: loc.title,
        phone: loc.phoneNumbers?.primaryPhone || null,
        address: loc.storefrontAddress?.addressLines?.join(", ") || null,
        website: loc.websiteUri || null,
        hours: loc.regularHours || null,
      },
      create: {
        id: loc.name ?? `${dbUser.id}-${loc.title}`,
        title: loc.title,
        phone: loc.phoneNumbers?.primaryPhone || null,
        address: loc.storefrontAddress?.addressLines?.join(", ") || null,
        website: loc.websiteUri || null,
        hours: loc.regularHours || null,
        userId: dbUser.id,
      },
    })
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
