import { TABLES, type Guest, type Table } from '@/data/tables'

export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export interface SearchResult {
  guest: Guest
  table: Table
}

/** Coincide si cada palabra escrita aparece en el nombre (sin importar acentos ni orden). */
export function searchGuests(query: string): SearchResult[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  return TABLES.flatMap((table) =>
    table.guests
      .filter((guest) => {
        const name = normalize(guest.name)
        return terms.every((term) => name.includes(term))
      })
      .map((guest) => ({ guest, table })),
  )
}
