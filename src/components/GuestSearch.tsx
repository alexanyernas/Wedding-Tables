import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Search, X } from 'lucide-react'
import { searchGuests, type SearchResult } from '@/lib/search'

interface GuestSearchProps {
  onPick: (result: SearchResult) => void
}

export function GuestSearch({ onPick }: GuestSearchProps) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchGuests(query), [query])
  const hasQuery = query.trim().length > 0

  function pick(result: SearchResult) {
    onPick(result)
    setQuery('')
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  return (
    <div className="relative">
      <label htmlFor="guest-search" className="sr-only">
        Busca tu nombre
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-lilac" />
        <input
          id="guest-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Escribe tu nombre…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results.length > 0) pick(results[0])
          }}
          className="h-14 w-full rounded-2xl border border-lilac/30 bg-white pl-12 pr-12 text-base shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-lilac focus:ring-4 focus:ring-lilac/20 [&::-webkit-search-cancel-button]:hidden"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 active:bg-neutral-100"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasQuery && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-lilac/20 bg-white p-1.5 shadow-xl shadow-plum/10"
          >
            {results.length === 0 ? (
              <li className="px-4 py-5 text-center text-sm text-neutral-500">
                No encontramos ese nombre. Prueba con tu apellido.
              </li>
            ) : (
              results.map((r) => (
                <li key={`${r.table.id}-${r.guest.name}`}>
                  <button
                    type="button"
                    onClick={() => pick(r)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left active:bg-lilac/10 md:hover:bg-lilac/10"
                  >
                    <span className="flex-1 text-[0.95rem] font-medium text-neutral-800">
                      {r.guest.name}
                    </span>
                    <span className="rounded-full bg-plum/10 px-3 py-1 text-xs font-semibold text-plum">
                      Mesa {r.table.id}
                    </span>
                    <ChevronRight className="size-4 text-lilac" />
                  </button>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
