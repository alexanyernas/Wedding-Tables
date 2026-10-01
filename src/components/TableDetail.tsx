import { AnimatePresence, motion } from 'framer-motion'
import { Hand, Heart, Users } from 'lucide-react'
import type { Table } from '@/data/tables'
import { cn } from '@/lib/utils'

interface TableDetailProps {
  table: Table | null
  highlightedGuest: string | null
}

export function TableDetail({ table, highlightedGuest }: TableDetailProps) {
  return (
    <AnimatePresence mode="wait">
      {table ? (
        <motion.div
          key={table.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'overflow-hidden rounded-3xl border bg-white shadow-sm',
            table.featured ? 'border-gold/40' : 'border-lilac/25',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-4 px-5 py-4 text-white',
              table.featured ? 'bg-gradient-to-r from-plum to-gold' : 'bg-plum',
            )}
          >
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-white/10 text-2xl font-semibold">
              {table.id}
            </div>
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-white/70">
                {table.featured ? 'Mesa de los novios' : 'Mesa'}
              </p>
              <p className="text-lg font-semibold">Mesa {table.id}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/80">
                <Users className="size-3.5" />
                {table.guests.length} invitados
              </p>
            </div>
          </div>

          <ul className="divide-y divide-lilac/15 px-2 py-1">
            {table.guests.map((guest, i) => {
              const isHighlighted = guest.name === highlightedGuest
              return (
                <motion.li
                  key={guest.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-3',
                    isHighlighted && 'bg-gold/10',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      isHighlighted ? 'bg-gold text-white' : 'bg-lilac/15 text-plum',
                    )}
                  >
                    {guest.role ? <Heart className="size-3.5 fill-current" /> : initials(guest.name)}
                  </span>
                  <span
                    className={cn(
                      'flex-1 text-[0.95rem]',
                      isHighlighted ? 'font-semibold text-plum' : 'text-neutral-800',
                    )}
                  >
                    {guest.name}
                  </span>
                  {guest.role && (
                    <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.7rem] font-semibold text-gold">
                      {guest.role}
                    </span>
                  )}
                  {isHighlighted && !guest.role && (
                    <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-gold">
                      Tú
                    </span>
                  )}
                </motion.li>
              )
            })}
          </ul>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-lilac/40 px-6 py-10 text-center"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-lilac/15 text-plum">
            <Hand className="size-5" />
          </div>
          <p className="text-sm text-neutral-500">
            Toca una mesa del plano o busca tu nombre para ver quiénes la acompañan.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}
