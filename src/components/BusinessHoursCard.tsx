// components/BusinessHoursCard.tsx
import React, { useEffect, useMemo, useState } from "react"

type Period = {
  openDay: string;     // "lunes" | "martes" | ...
  openTime: string;    // "08:00"
  closeTime: string;   // "20:00"
}

type Hours = { periods: Period[] }

type Business = {
  title: string
  hours?: Hours | null
}

type Props = { business: Business }

const DAYS_ORDER = [
  "lunes",
  "martes",
  "miercoles",
  "miércoles", // por si viene con tilde
  "jueves",
  "viernes",
  "sabado",
  "sábado",
  "domingo",
]

function normalizeDay(d: string) {
  return d
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // quita tildes
}

function getTodayEsLower(): string {
  const today = new Date().toLocaleString("es-ES", { weekday: "long" })
  return normalizeDay(today) // ej: "miercoles"
}

function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10))
  return h * 60 + (m || 0)
}

function formatTimeToAmPm(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":")
  const h = parseInt(hStr, 10)
  const m = parseInt(mStr || "0", 10)
  const isPM = h >= 12
  const hour12 = h % 12 === 0 ? 12 : h % 12
  const min = m === 0 ? "" : `:${m.toString().padStart(2, "0")}`
  return `${hour12}${min} ${isPM ? "p.m." : "a.m."}`
}

/** Devuelve el Period del día pedido (normalizando tildes). */
function getPeriodForDay(periods: Period[] = [], dayLowerNoTilde: string): Period | undefined {
  return periods.find(
    (p) => normalizeDay(p.openDay) === dayLowerNoTilde
  )
}

/** Calcula si AHORA está abierto según el horario de hoy. */
function calcIsOpenNow(periods: Period[] = []): { isOpenNow: boolean; closesAt?: string } {
  const today = getTodayEsLower()
  const todayPeriod = getPeriodForDay(periods, today)
  if (!todayPeriod) return { isOpenNow: false }

  const now = new Date()
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  const open = hhmmToMinutes(todayPeriod.openTime)
  const close = hhmmToMinutes(todayPeriod.closeTime)

  const isOpenNow = minutesNow >= open && minutesNow < close
  return { isOpenNow, closesAt: todayPeriod.closeTime }
}

export default function BusinessHoursCard({ business }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  // Datos base
  const periods = business.hours?.periods || []


  // Cálculo memoizado de estado "abierto ahora"
  const { isOpenNow, closesAt } = useMemo(() => calcIsOpenNow(periods), [periods])

  // Cerrar con ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false)
    }
    if (modalOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [modalOpen])

  const today = getTodayEsLower()

  return (
    <>
      {/* Card clickable */}
      <div
        onClick={() => setModalOpen(true)}
        className="cursor-pointer flex flex-col justify-between rounded-xl p-4 bg-stone-100 hover:bg-stone-200 transition"
      >
        <p className="text-sm text-gray-600">Horario de atención</p>
        <div>
          <p className={`${isOpenNow ? "text-[#198639]" : "text-[#d93025]"} font-medium text-xl`}>
            {isOpenNow ? "Abierto" : "Cerrado"}
          </p>
          <p className="text-xs text-gray-600">
            {isOpenNow && closesAt ? `Cierra a las ${formatTimeToAmPm(closesAt)}` : "—"}
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)} // click en backdrop
        >
          <div
            className="bg-white rounded-xl shadow-lg w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()} // evitar cerrar si clickean dentro
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 p-5">
              <h2 className="text-xl">Horario de atención</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            {/* Lista de días (orden clásico) */}
            <div className="p-5 space-y-3">
              {[
                "lunes",
                "martes",
                "miercoles",
                "jueves",
                "viernes",
                "sabado",
                "domingo",
              ].map((dayKey) => {
                const p = getPeriodForDay(periods, dayKey)
                const isToday = dayKey === today
                return (
                  <div
                    key={dayKey}
                    className={`flex justify-between ${isToday ? "font-semibold text-[#198639]" : ""}`}
                  >
                    <span className="capitalize">
                      {dayKey === "miercoles" ? "miércoles" : dayKey}
                    </span>
                    <span className="text-gray-700">
                      {p
                        ? `${formatTimeToAmPm(p.openTime)}–${formatTimeToAmPm(p.closeTime)}`
                        : "Cerrado"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
