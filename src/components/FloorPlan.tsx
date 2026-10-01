import { motion } from 'framer-motion'
import { TABLES, type Table } from '@/data/tables'
import { cn } from '@/lib/utils'

interface FloorPlanProps {
  selectedId: number | null
  onSelect: (id: number) => void
}

export function FloorPlan({ selectedId, onSelect }: FloorPlanProps) {
  return (
    <div className="floor-grid relative mx-auto aspect-[20/21] w-full max-w-[560px] rounded-3xl border border-lilac/25 shadow-sm">
      {TABLES.map((table, i) => (
        <TableButton
          key={table.id}
          table={table}
          index={i}
          selected={selectedId === table.id}
          dimmed={selectedId !== null && selectedId !== table.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

interface TableButtonProps {
  table: Table
  index: number
  selected: boolean
  dimmed: boolean
  onSelect: (id: number) => void
}

function TableButton({ table, index, selected, dimmed, onSelect }: TableButtonProps) {
  const seats = table.guests.length
  const featured = table.featured

  const tableFill = selected ? '#731985' : featured ? '#fffaf0' : '#ffffff'
  const tableStroke = featured ? '#cb9b25' : selected ? '#731985' : '#9a8ad8'
  const seatFill = selected ? '#cb9b25' : featured ? '#cb9b25' : '#9a8ad8'
  const labelColor = selected ? '#ffffff' : featured ? '#cb9b25' : '#731985'

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(table.id)}
      aria-label={`Mesa ${table.id}, ${seats} invitados`}
      aria-pressed={selected}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: dimmed ? 0.4 : 1, scale: selected ? 1.08 : 1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.05 }}
      className={cn(
        'absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full outline-none',
        'focus-visible:ring-4 focus-visible:ring-lilac/50',
        featured ? 'w-[27%]' : 'w-[23%]',
        selected && 'z-10',
      )}
      style={{ left: `${table.x}%`, top: `${table.y}%` }}
    >
      {selected && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-plum"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 1.35 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        {Array.from({ length: seats }, (_, s) => {
          const angle = (s / seats) * Math.PI * 2 - Math.PI / 2
          return (
            <circle
              key={s}
              cx={50 + Math.cos(angle) * 43}
              cy={50 + Math.sin(angle) * 43}
              r={7.5}
              fill={seatFill}
              opacity={selected || featured ? 1 : 0.55}
            />
          )
        })}
        <circle
          cx={50}
          cy={50}
          r={31}
          fill={tableFill}
          stroke={tableStroke}
          strokeWidth={featured ? 3 : 2}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(61,16,84,0.15))' }}
        />
        <text
          x={50}
          y={featured ? 47 : 51}
          textAnchor="middle"
          dominantBaseline="central"
          fill={labelColor}
          fontSize={featured ? 26 : 28}
          fontWeight={600}
        >
          {table.id}
        </text>
        {featured && (
          <text
            x={50}
            y={66}
            textAnchor="middle"
            dominantBaseline="central"
            fill={selected ? '#ffffffcc' : '#731985'}
            fontSize={8.5}
            fontWeight={500}
            letterSpacing={1}
          >
            NOVIOS
          </text>
        )}
      </svg>
    </motion.button>
  )
}
