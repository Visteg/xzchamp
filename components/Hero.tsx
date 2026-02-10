'use client'

import { useState, useEffect } from 'react'
import RegistrationForm from './RegistrationForm'
import MasterclassForm from './MasterclassForm'
import SpectatorForm from './SpectatorForm'

export default function Hero() {
  const [isChampionshipMenuOpen, setIsChampionshipMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'solo' | 'duet' | 'team' | null>(null)
  const [isMasterclassFormOpen, setIsMasterclassFormOpen] = useState(false)
  const [isSpectatorFormOpen, setIsSpectatorFormOpen] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    // Gyroscope handler for mobile devices
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        const maxTilt = 15
        const x = Math.max(-maxTilt, Math.min(maxTilt, event.gamma / 3))
        const y = Math.max(-maxTilt, Math.min(maxTilt, event.beta / 3))
        setTilt({ x, y })
      }
    }

    // Mouse control for desktop
    const handleMouseMove = (event: MouseEvent) => {
      const maxTilt = 15
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const x = ((event.clientX - centerX) / centerX) * maxTilt
      const y = ((event.clientY - centerY) / centerY) * maxTilt

      setTilt({ x, y })
    }

    if (isMobile) {
      // Mobile: Use gyroscope
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // iOS 13+ requires permission
        (DeviceOrientationEvent as any).requestPermission()
          .then((permission: string) => {
            if (permission === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation)
            }
          })
          .catch(() => console.log('Gyroscope permission denied'))
      } else {
        // Android and other mobile devices
        window.addEventListener('deviceorientation', handleOrientation)
      }
    } else {
      // Desktop: Use mouse
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

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
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center relative px-4 pt-20">
      {/* Logo Container */}
      <div className="max-w-2xl w-full mb-8 px-4">
        {/* Float animation wrapper */}
        <div
          className="relative flex items-center justify-center"
          style={{
            animation: 'float 5s ease-in-out infinite'
          }}
        >
          {/* Decorative background logo - Static */}
          <img
            src="/proexz загогулина лого.png"
            alt="PRO2XZ Logo Background"
            className="w-full h-auto opacity-60"
            style={{
              mixBlendMode: 'screen',
              filter: 'blur(1px) drop-shadow(0 0 40px rgba(255, 0, 204, 0.3))'
            }}
          />
          {/* Clean logo overlay - With tilt effect */}
          <img
            src="/proexz без загогулина лого.png"
            alt="PRO2XZ Logo"
            className="absolute w-full h-auto"
            style={{
              transform: `perspective(1000px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: 'transform 0.1s ease-out',
              filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 0, 204, 0.4))'
            }}
          />
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
            style={{ boxShadow: '0 0 25px rgba(255, 0, 204, 0.15), 0 0 50px rgba(255, 0, 204, 0.08)' }}
          >
            Чемпионат
          </button>

          <button
            onClick={() => setIsMasterclassFormOpen(true)}
            className="w-full py-4 px-6 rounded-full border-2 border-[var(--neon-blue)] text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-[var(--neon-blue)]/10 hover:shadow-[0_0_20px_var(--neon-blue)]"
            style={{ boxShadow: '0 0 25px rgba(0, 240, 255, 0.12), 0 0 50px rgba(0, 240, 255, 0.06)' }}
          >
            Мастер-классы
          </button>

          <button
            onClick={() => setIsSpectatorFormOpen(true)}
            className="w-full py-4 px-6 rounded-full border-2 border-white/30 text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.06), 0 0 40px rgba(255, 255, 255, 0.03)' }}
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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
          onClick={closeChampionshipMenu}
        >
          <div
            className="relative rounded-3xl max-w-md w-full mx-4 shadow-[0_0_80px_var(--neon-pink),inset_0_0_80px_rgba(255,0,204,0.1)]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalSlideIn 0.3s ease-out',
              background: 'linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(10,10,15,0.95) 100%)',
              border: '1px solid rgba(255,0,204,0.3)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Glass highlight */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                borderRadius: 'inherit'
              }}
            />
            <div className="p-8 md:p-12">
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  )
}
