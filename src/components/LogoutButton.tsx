"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
    >
      Cerrar sesión
    </button>
  )
}
