import { motion } from 'framer-motion'
import headerBg from '@/assets/header-bg.webp'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden bg-plum-deep pb-10 pt-[max(2.5rem,env(safe-area-inset-top))] text-center md:pb-14 md:pt-14"
    >
      {/* Carrusel infinito (2 copias lado a lado) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="header-img-strip flex h-full" style={{ width: 'max-content' }}>
          <img src={headerBg} alt="" className="h-full w-auto shrink-0" />
          <img src={headerBg} alt="" className="h-full w-auto shrink-0" />
        </div>
      </div>

      <div className="absolute inset-0" style={{ background: 'rgba(115,25,133,0.88)' }} />

      <div className="relative z-10 flex flex-col items-center gap-3 px-4">
        <img
          src="/logo.svg"
          alt="Logo de los novios"
          className="h-12 w-auto md:h-14"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/70 md:text-xs">
          Distribución de Mesas
        </p>
        <img
          src="/nombres.svg"
          alt="Alejandra y Alexanyer"
          className="h-12 w-auto max-w-[300px] md:h-16 md:max-w-[420px]"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <div className="h-px w-24 bg-gold opacity-60" />
        <p className="text-sm font-light text-white/80">Encuentra tu lugar en la recepción</p>
      </div>
    </motion.header>
  )
}
