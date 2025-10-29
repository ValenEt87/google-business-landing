import React, { useMemo } from "react"

type Period = {
  openDay: string
  openTime: string
  closeTime: string
}

type Hours = { periods: Period[] }

type Business = {
  title: string
  hours?: Hours | null
}

type Props = {
  business: Business
}

function normalizeDay(d: string) {
  return d
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

function getTodayEsLower(): string {
  const today = new Date().toLocaleString("es-ES", { weekday: "long" })
  return normalizeDay(today)
}

function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10))
  return h * 60 + (m || 0)
}

/** Genera los intervalos de horas entre openTime y closeTime */
function generateHourlyData(open: string, close: string) {
  const start = hhmmToMinutes(open)
  const end = hhmmToMinutes(close)
  const hours: { hour: string; value: number }[] = []

  const range = Math.floor((end - start) / 60)
  for (let i = 0; i <= range; i++) {
    const h = Math.floor((start + i * 60) / 60)
    const label = `${h > 12 ? h - 12 : h}${h >= 12 ? "p.m." : "a.m."}`
    // Distribuimos un patrón tipo campana para simular concurrencia
    const peak = Math.floor(range / 2)
    const value = Math.max(20, 100 - Math.abs(i - peak) * (100 / peak))
    hours.push({ hour: label, value })
  }

  return hours
}

export default function BusinessPopularTimes({ business }: Props) {
  const today = getTodayEsLower()
  const todayPeriod = business.hours?.periods?.find(
    (p) => normalizeDay(p.openDay) === today
  )

  const now = new Date()
  const currentHour = now.getHours()

  const data = useMemo(() => {
    if (!todayPeriod) return []
    return generateHourlyData(todayPeriod.openTime, todayPeriod.closeTime)
  }, [todayPeriod])

  const currentIndex = data.findIndex((d) => {
    const h = parseInt(d.hour)
    return h === (currentHour % 12 || 12)
  })

  return (
    <section className="my-24">
      <h2 className="text-3xl mb-4">Horarios</h2>

      {/* Días de la semana */}
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        {["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"].map((d, i) => (
          <span
            key={d}
            className={`${
              i === 2 ? "text-[#1F1F1F] font-medium border-b-2 border-[#1F1F1F]" : ""
            } pb-1`}
          >
            {d}
          </span>
        ))}
      </div>

      {/* Estado */}
      <div className="flex items-center gap-2 mb-3 text-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-[#D93025]" />
        <p>
          <span className="text-[#D93025] font-medium">Datos actuales:</span>{" "}
          {todayPeriod
            ? "Menos concurrido de lo habitual"
            : "Sin datos para hoy"}
        </p>
      </div>

      {/* Gráfico */}
      {todayPeriod ? (
        <div className="relative flex items-end justify-between h-40 border-b border-gray-200">
          {data.map((item, i) => {
            const isCurrent = i === currentIndex
            return (
              <div
                key={item.hour}
                className="flex flex-col items-center justify-end flex-1 mx-[1px]"
              >
                <div className="relative w-3 sm:w-4">
                  {/* barra principal */}
                  <div
                    className={`w-full rounded-t-md ${
                      isCurrent ? "bg-[#D93025]" : "bg-[#4E8BFF]"
                    }`}
                    style={{ height: `${item.value}%` }}
                  />
                  {/* sombra de proyección */}
                  {isCurrent && (
                    <div
                      className="absolute top-0 w-full bg-gray-300 rounded-t-md opacity-60"
                      style={{ height: `${item.value + 15}%` }}
                    />
                  )}
                </div>
                <span className="mt-2 text-[10px] text-gray-600">
                  {item.hour}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Este negocio no abre hoy.</p>
      )}

      {/* Pie */}
      <div className="flex items-center gap-2 mt-4 text-gray-600 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <p>
          Las personas suelen pasar hasta{" "}
          <span className="font-semibold">1.5 horas</span> aquí
        </p>
      </div>
    </section>
  )
}
