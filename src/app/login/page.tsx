// app/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Columna izquierda */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="max-w-sm w-full text-center flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-2">¡Bienvenido!</h1>
          <p className="text-gray-500 mb-6">Iniciá sesión con tu cuenta de Google</p>
          <button
            onClick={() => signIn('google')}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-black">Continuar con Google</span>
          </button>
          <p className="text-xs text-gray-500 mt-4">
            ¿No tenés cuenta? <a href="#" className="text-blue-500 font-medium">Registrate gratis</a>
          </p>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://i.pinimg.com/1200x/12/3e/5f/123e5f6e508c58c2bf3453a1d3ee3815.jpg"
          alt="Paisaje"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </div>
  )
}
