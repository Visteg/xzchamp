import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="cyber-grid"></div>
      <div className="glow-orb orb-center"></div>

      <div className="relative z-10 text-center px-4">
        <h1
          className="font-['Unbounded'] text-[120px] md:text-[180px] font-black leading-none mb-4"
          style={{
            color: 'transparent',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            backgroundImage: 'linear-gradient(135deg, var(--neon-pink), var(--neon-blue))',
          }}
        >
          404
        </h1>
        <p className="font-['Unbounded'] text-lg md:text-xl text-white/70 mb-8">
          Страница не найдена
        </p>
        <Link
          href="/"
          className="inline-block py-4 px-8 rounded-full border-2 border-[var(--neon-pink)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-pink)]/10 hover:shadow-[0_0_20px_var(--neon-pink)]"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}
