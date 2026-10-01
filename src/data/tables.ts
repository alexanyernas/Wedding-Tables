export interface Guest {
  name: string
  role?: string
}

export interface Table {
  id: number
  guests: Guest[]
  /** Posición del centro de la mesa en el plano, en % del ancho/alto. */
  x: number
  y: number
  featured?: boolean
}

// Posiciones transcritas del croquis del salón: la mesa 7 (novios) al centro,
// el resto alrededor en sentido horario desde arriba: 2, 6, 1, 5, 4, 3.
export const TABLES: Table[] = [
  {
    id: 1,
    x: 84,
    y: 64,
    guests: [
      { name: 'Ramón Naranjo' },
      { name: 'Zulay de Naranjo' },
      { name: 'Alexandra Naranjo' },
      { name: 'José Naranjo' },
      { name: 'Dylan García' },
    ],
  },
  {
    id: 2,
    x: 47,
    y: 14,
    guests: [
      { name: 'Yarima Contreras' },
      { name: 'Rafael Contreras' },
      { name: 'Yemaire Delgado' },
      { name: 'Amalia Giannattasio' },
      { name: 'Adrianny Acosta' },
    ],
  },
  {
    id: 3,
    x: 16,
    y: 37,
    guests: [
      { name: 'Francisco Blanco' },
      { name: 'Carolina Blanco' },
      { name: 'Mileidy de Los Santos' },
      { name: 'Tony Giannattasio' },
      { name: 'Jorge Jaramillo' },
    ],
  },
  {
    id: 4,
    x: 16,
    y: 76,
    guests: [
      { name: 'Jesús Cordova' },
      { name: 'Gabriela Otero' },
      { name: 'Shaira Perez' },
      { name: 'Francisco Dos Ramos' },
      { name: 'Christopher Suarez' },
    ],
  },
  {
    id: 5,
    x: 52,
    y: 86,
    guests: [
      { name: 'Michel Naranjo' },
      { name: 'Jackeline Marquez' },
      { name: 'Nicole Naranjo' },
      { name: 'Miranda Naranjo' },
      { name: 'Miguel Amato' },
      { name: 'María Giannattasio' },
    ],
  },
  {
    id: 6,
    x: 84,
    y: 24,
    guests: [
      { name: 'Antonieta Naranjo' },
      { name: 'Carlos Villegas' },
      { name: 'Carlos E. Villegas' },
      { name: 'Dominic Villegas' },
      { name: 'Daniel Naranjo' },
    ],
  },
  {
    id: 7,
    x: 53,
    y: 51,
    featured: true,
    guests: [
      { name: 'Alexanyer Naranjo', role: 'Novio' },
      { name: 'Alejandra Giannattasio', role: 'Novia' },
      { name: 'Daniel Hernández' },
      { name: 'Chiquinquira Hernández' },
      { name: 'Daniela Salcedo' },
    ],
  },
]

export const TOTAL_GUESTS = TABLES.reduce((sum, t) => sum + t.guests.length, 0)
