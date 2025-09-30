// src/app/page.tsx
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // 🔒 Redirigir al login si no hay sesión
  if (!session?.user?.email) {
    redirect("/api/auth/signin")
  }

  // 🔍 Buscar el usuario y sus negocios asociados
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { businesses: true },
  })

  const firstBusiness = user?.businesses?.[0]

  // ⚠️ Si no tiene negocios
  if (!firstBusiness) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontraron negocios para esta cuenta.</p>
      </div>
    )
  }

  // ⚠️ Si es un negocio mock, no redirigir
  if (firstBusiness.id.startsWith("mock-")) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontraron negocios reales para esta cuenta.</p>
      </div>
    )
  }

  // ✅ Redirigir a la landing de su negocio
  redirect(`/landing/${firstBusiness.id}`)
}
