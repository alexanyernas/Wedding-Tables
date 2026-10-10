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

// Posiciones transcritas del croquis del salón: la mesa 1 (novios) al centro,
// 7 y 2 arriba, 5 a la izquierda, 4 a la derecha, y 6 y 3 abajo.
export const TABLES: Table[] = [
  {
    id: 1,
    x: 45,
    y: 51,
    featured: true,
    guests: [
      { name: 'Alejandra Giannattasio', role: 'Novia' },
      { name: 'Alexanyer Naranjo', role: 'Novio' },
      { name: 'Daniel Hernández' },
      { name: 'Daniela Salcedo' },
      { name: 'Chiquinquira Hernández' },
    ],
  },
  {
    id: 2,
    x: 47,
    y: 25,
    guests: [
      { name: 'Ramón Naranjo' },
      { name: 'Zulay de Naranjo' },
      { name: 'Alexandra Naranjo' },
      { name: 'José Antonio Naranjo' },
      { name: 'Dylan García' },
    ],
  },
  {
    id: 3,
    x: 85,
    y: 83,
    guests: [
      { name: 'María Giannattasio' },
      { name: 'Miguel Amato' },
      { name: 'Fran' },
      { name: 'Gisela' },
    ],
  },
  {
    id: 4,
    x: 75,
    y: 47,
    guests: [
      { name: 'Michel Naranjo' },
      { name: 'Jackeline Marquez' },
      { name: 'Nicole Naranjo' },
      { name: 'Miranda Naranjo' },
      { name: 'Daniel Naranjo' },
    ],
  },
  {
    id: 5,
    x: 16,
    y: 51,
    guests: [
      { name: 'Jesús Cordova' },
      { name: 'Gabriela Otero' },
      { name: 'Shaira Perez' },
      { name: 'Francisco Dos Ramos' },
    ],
  },
  {
    id: 6,
    x: 46,
    y: 86,
    guests: [
      { name: 'Francisco Blanco' },
      { name: 'Carolina Blanco' },
      { name: 'Mileidy de Los Santos' },
      { name: 'Jorge Jaramillo' },
      { name: 'Tony Giannattasio' },
    ],
  },
  {
    id: 7,
    x: 16,
    y: 14,
    guests: [
      { name: 'Yarima Contreras' },
      { name: 'Rafael Contreras' },
      { name: 'Yemaire Delgado' },
      { name: 'Amalia Giannattasio' },
      { name: 'Adrianny Acosta' },
    ],
  },
]

export const TOTAL_GUESTS = TABLES.reduce((sum, t) => sum + t.guests.length, 0)
