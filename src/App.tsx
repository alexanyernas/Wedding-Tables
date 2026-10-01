import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { GuestSearch } from '@/components/GuestSearch'
import { FloorPlan } from '@/components/FloorPlan'
import { TableDetail } from '@/components/TableDetail'
import { TABLES, TOTAL_GUESTS } from '@/data/tables'
import type { SearchResult } from '@/lib/search'
import { cn } from '@/lib/utils'

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [highlightedGuest, setHighlightedGuest] = useState<string | null>(null)
  const [scrollRequest, setScrollRequest] = useState(0)
  const detailRef = useRef<HTMLElement>(null)

  const selectedTable = TABLES.find((t) => t.id === selectedId) ?? null

  // Lleva el detalle de la mesa a la vista. Espera a que termine la transición
  // de salida del detalle anterior para medir la tarjeta ya montada.
  useEffect(() => {
    if (scrollRequest === 0) return
    const timer = setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 320)
    return () => clearTimeout(timer)
  }, [scrollRequest])

  function selectTable(id: number) {
    setHighlightedGuest(null)
    if (selectedId === id) {
      setSelectedId(null)
      return
    }
    setSelectedId(id)
    setScrollRequest((n) => n + 1)
  }

  function pickGuest({ guest, table }: SearchResult) {
    setSelectedId(table.id)
    setHighlightedGuest(guest.name)
    setScrollRequest((n) => n + 1)
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-white">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 md:px-8 md:pt-10">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-6">
          {/* Buscador (en tableta va en la columna derecha) */}
          <section className="md:col-start-2 md:row-start-1">
            <SectionTitle>¿Dónde me siento?</SectionTitle>
            <GuestSearch onPick={pickGuest} />
          </section>

          {/* Plano del salón */}
          <section
            className="md:col-start-1 md:row-span-2 md:row-start-1"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <SectionTitle className="mb-0">Plano del salón</SectionTitle>
              <span className="text-xs text-neutral-400">
                {TABLES.length} mesas · {TOTAL_GUESTS} invitados
              </span>
            </div>
            <FloorPlan selectedId={selectedId} onSelect={selectTable} />

            {/* Accesos rápidos */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[...TABLES]
                .sort((a, b) => a.id - b.id)
                .map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTable(t.id)}
                    className={cn(
                      'flex size-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                      selectedId === t.id
                        ? 'border-plum bg-plum text-white'
                        : t.featured
                          ? 'border-gold/60 text-gold'
                          : 'border-lilac/40 text-plum',
                    )}
                    aria-label={`Ver mesa ${t.id}`}
                  >
                    {t.id}
                  </button>
                ))}
            </div>
          </section>

          {/* Detalle de la mesa */}
          <motion.section
            ref={detailRef}
            layout
            className="scroll-mb-4 scroll-mt-4 md:sticky md:top-6 md:col-start-2 md:row-start-2 md:self-start"
          >
            <TableDetail table={selectedTable} highlightedGuest={highlightedGuest} />
          </motion.section>
        </div>
      </main>

      <footer className="pb-8 text-center text-xs text-neutral-400">
        <span className="text-gold">🦄</span> Hecho con amor <span className="text-gold">☕️</span>
      </footer>
    </div>
  )
}

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('mb-3 text-lg font-semibold text-plum', className)}>{children}</h2>
}
