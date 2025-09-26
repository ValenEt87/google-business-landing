import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/business.manage",
        },
      },
    }),
  ],
  callbacks: {
    // Sincroniza datos al iniciar sesión
    async signIn({ user, account }) {
      try {
        if (!user?.email) return true

        // upsert user
        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: { name: user.name ?? null, image: user.image ?? null },
          create: { email: user.email, name: user.name ?? null, image: user.image ?? null },
        })

        // si hay token de Google, intentamos traer accounts/locations reales
        if (account?.access_token) {
          const headers = { Authorization: `Bearer ${account.access_token}` }

          const resAccounts = await fetch(
            "https://mybusinessbusinessinformation.googleapis.com/v1/accounts",
            { headers }
          )
          const accountsData = await resAccounts.json()

          let locationsData: any = null

          if (accountsData?.accounts?.length) {
            const accountId = accountsData.accounts[0].name
            const resLocations = await fetch(
              `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
              { headers }
            )
            locationsData = await resLocations.json()
          }

          // si hay locations reales, guardamos; si no, quedará vacío (o podrías usar mock)
          if (locationsData?.locations?.length) {
            for (const loc of locationsData.locations) {
              await prisma.business.upsert({
                where: { id: loc.name ?? `${dbUser.id}-${loc.title}` },
                update: {
                  title: loc.title,
                  phone: loc.phoneNumbers?.primaryPhone || null,
                  address:
                    loc.storefrontAddress?.addressLines?.join(", ") || null,
                  website: loc.websiteUri || null,
                  hours: loc.regularHours || null,
                },
                create: {
                  id: loc.name ?? `${dbUser.id}-${loc.title}`,
                  title: loc.title,
                  phone: loc.phoneNumbers?.primaryPhone || null,
                  address:
                    loc.storefrontAddress?.addressLines?.join(", ") || null,
                  website: loc.websiteUri || null,
                  hours: loc.regularHours || null,
                  userId: dbUser.id,
                },
              })
            }
          }
        }

        return true
      } catch (e) {
        console.error("signIn sync error", e)
        return true
      }
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        ;(token as any).accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if ((token as any).accessToken) {
        ;(session as any).accessToken = (token as any).accessToken
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
