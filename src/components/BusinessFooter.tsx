import React from "react"

type Props = {
  title: string
  phone?: string | null
  email?: string | null
  logoUrl?: string
}

export default function BusinessFooter({
  title,
  phone,
  email,
  logoUrl = "/mock/footer-logo.png", // Imagen pequeña o logo
}: Props) {
  return (
    <footer className="rounded-2xl flex flex-col items-center text-center gap-2 max-w-7xl mx-auto pb-4">
        <div className="bg-gray-100 py-8 px-6 rounded-2xl flex flex-col items-center text-center w-full">
            {/* Nombre del negocio */}
            <h2 className="text-xl font-medium mb-3">{title}</h2>

            {/* Datos de contacto */}
            <div className="text-sm text-gray-700 space-y-1">
                {phone && (
                <p>
                    Teléfono:{" "}
                    <a
                    href={`tel:${phone}`}
                    className="text-[#1A0DAB] hover:underline"
                    >
                    {phone}
                    </a>
                </p>
                )}
                {email && (
                    <a
                    href={`mailto:${email}`}
                    className="text-[#1A0DAB] hover:underline"
                    >
                    {email}
                    </a>
                )}
                {/* Separador visual */}
                <div className="w-full h-[1px] bg-gray-300 my-6 max-w-sm"></div>
                <p className="pt-2 text-gray-500">
                <a href="#" className="hover:underline">
                    Políticas de privacidad
                </a>
                </p>
            </div>
        </div>
      {/* Imagen inferior */}
      <div className="bg-gray-100 p-2 rounded-full flex flex-col items-center text-center w-full">
        <img
          src="/Logo-Autores-.webp"
          alt="Logo Autores"
          className="h-8 w-8 w-auto transition"
        />
      </div>
    </footer>
  )
}
