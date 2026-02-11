import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="cyber-grid"></div>
      <div className="glow-orb orb-center"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--neon-pink)] transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад на главную
        </Link>

        {/* Title */}
        <h1 className="font-['Unbounded'] text-3xl md:text-4xl font-bold mb-8">
          <span className="chrome-text">Политика конфиденциальности</span>
        </h1>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6">
              {/* ТЕКСТ ИЗ ФАЙЛА Политика_конфиденциальности_сайт.odt */}
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Общие положения</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Текст раздела...
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Персональные данные</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Текст раздела...
            </p>

            {/* Добавьте остальные разделы из файла */}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
        </div>
      </div>
    </div>
  )
}
