'use client'

import { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import MasterclassForm from './MasterclassForm'
import SpectatorForm from './SpectatorForm'

export default function Hero() {
  const [isChampionshipMenuOpen, setIsChampionshipMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'solo' | 'duet' | 'team' | null>(null)
  const [isMasterclassFormOpen, setIsMasterclassFormOpen] = useState(false)
  const [isSpectatorFormOpen, setIsSpectatorFormOpen] = useState(false)

  const openChampionshipMenu = () => {
    setIsChampionshipMenuOpen(true)
  }

  const closeChampionshipMenu = () => {
    setIsChampionshipMenuOpen(false)
  }

  const handleCategorySelect = (category: 'solo' | 'duet' | 'team') => {
    setSelectedCategory(category)
    closeChampionshipMenu()
  }

  const closeRegistrationForm = () => {
    setSelectedCategory(null)
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center relative px-4">
      {/* Video Container */}
      <div className="max-w-md w-full mb-8">
        <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center aspect-video border border-white/10">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white/5 rounded-xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-gray-500">Видео</p>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <h2
        className="font-['Unbounded'] font-black text-base md:text-xl tracking-wide mb-12 max-w-md"
        style={{
          background: 'linear-gradient(180deg, #FFF 0%, #AAA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
        }}
      >
        Танцевальный чемпионат с заботой о танце.
      </h2>

      {/* Registration Section */}
      <div className="mt-12 w-full max-w-md px-4">

        <h3 className="chrome-text font-['Unbounded'] text-2xl font-bold mb-6">
          Регистрация
        </h3>

        <div className="space-y-4">
          <button
            onClick={openChampionshipMenu}
            className="w-full py-4 px-6 rounded-full border-2 border-[var(--neon-pink)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-pink)]/10 hover:shadow-[0_0_20px_var(--neon-pink)]"
          >
            Чемпионат
          </button>

          <button
            onClick={() => setIsMasterclassFormOpen(true)}
            className="w-full py-4 px-6 rounded-full border-2 border-[var(--neon-blue)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-blue)]/10 hover:shadow-[0_0_20px_var(--neon-blue)]"
          >
            Мастер-классы
          </button>

          <button
            onClick={() => setIsSpectatorFormOpen(true)}
            className="w-full py-4 px-6 rounded-full border-2 border-white/30 text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:border-white/50 hover:bg-white/5"
          >
            Зрительские билеты
          </button>
        </div>
      </div>

      {/* Registration Form */}
      {selectedCategory && (
        <RegistrationForm
          category={selectedCategory}
          onClose={closeRegistrationForm}
        />
      )}

      {/* Masterclass Form */}
      {isMasterclassFormOpen && (
        <MasterclassForm onClose={() => setIsMasterclassFormOpen(false)} />
      )}

      {/* Spectator Form */}
      {isSpectatorFormOpen && (
        <SpectatorForm onClose={() => setIsSpectatorFormOpen(false)} />
      )}

      {/* Championship Category Modal */}
      {isChampionshipMenuOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={closeChampionshipMenu}
        >
          <div
            className="relative bg-[var(--bg-color)] border-2 border-[var(--neon-pink)] rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 shadow-[0_0_40px_var(--neon-pink)]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalSlideIn 0.3s ease-out'
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeChampionshipMenu}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h3 className="font-['Unbounded'] text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="chrome-text">Выберите категорию</span>
            </h3>

            {/* Category Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handleCategorySelect('solo')}
                className="w-full py-4 px-6 rounded-full border-2 border-[var(--neon-pink)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-pink)]/20 hover:shadow-[0_0_30px_var(--neon-pink)] hover:scale-105"
              >
                Соло
              </button>

              <button
                onClick={() => handleCategorySelect('duet')}
                className="w-full py-4 px-6 rounded-full border-2 border-[var(--neon-pink)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-pink)]/20 hover:shadow-[0_0_30px_var(--neon-pink)] hover:scale-105"
              >
                Дуэт
              </button>

              <button
                onClick={() => handleCategorySelect('team')}
                className="w-full py-4 px-6 rounded-full border-2 border-[var(--neon-pink)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-pink)]/20 hover:shadow-[0_0_30px_var(--neon-pink)] hover:scale-105"
              >
                Команда
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
