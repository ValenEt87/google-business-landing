// src/app/page.tsx
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // Si no hay sesión, mandar al login
  if (!session?.user?.email) {
    redirect("/api/auth/signin")
  }

  // Buscar usuario y negocios
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { businesses: true },
  })

  // Si tiene negocio asociado → redirigir a su landing
  if (user?.businesses[0]) {
    redirect(`/landing/${user.businesses[0].id}`)
  }

  // Si no tiene negocios aún
  return (
    <div className="flex justify-center items-center h-screen">
      <p>No se encontraron negocios para esta cuenta.</p>
    </div>
  )
}
