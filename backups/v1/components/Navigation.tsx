'use client'

import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 backdrop-blur-sm border-b border-white/10 relative z-50">
        <div className="font-['Unbounded'] font-black text-lg md:text-xl text-white uppercase">
          PRO2XZ
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 md:gap-8">
          <a href="#championship" className="nav-link text-xs md:text-sm font-bold uppercase tracking-wide transition-all duration-300">
            Чемпионат
          </a>
          <a href="#masterclasses" className="nav-link text-xs md:text-sm font-bold uppercase tracking-wide transition-all duration-300">
            Мастер-классы
          </a>
          <a href="#memories" className="nav-link text-xs md:text-sm font-bold uppercase tracking-wide transition-all duration-300">
            Галерея
          </a>
          <a href="#social" className="nav-link text-xs md:text-sm font-bold uppercase tracking-wide transition-all duration-300">
            Соц.сети
          </a>
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`flex flex-col items-center justify-center h-full transition-all duration-500 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6 w-full max-w-md px-8">
            <a
              href="#championship"
              onClick={toggleMenu}
              className="mobile-menu-btn block w-full py-3 text-center text-white font-['Unbounded'] font-bold uppercase tracking-wider text-lg transition-all duration-300"
            >
              Положение чемпионата
            </a>

            <a
              href="#masterclasses"
              onClick={toggleMenu}
              className="mobile-menu-btn block w-full py-3 text-center text-white font-['Unbounded'] font-bold uppercase tracking-wider text-lg transition-all duration-300"
            >
              Мастер-классы
            </a>

            <a
              href="#social"
              onClick={toggleMenu}
              className="mobile-menu-btn block w-full py-3 text-center text-white font-['Unbounded'] font-bold uppercase tracking-wider text-lg transition-all duration-300"
            >
              Соц.сети
            </a>

            <a
              href="#privacy"
              onClick={toggleMenu}
              className="mobile-menu-btn block w-full py-3 text-center text-white font-['Unbounded'] font-bold uppercase tracking-wider text-lg transition-all duration-300"
            >
              Политика конфиденциальности
            </a>

            <a
              href="#offer"
              onClick={toggleMenu}
              className="mobile-menu-btn block w-full py-3 text-center text-white font-['Unbounded'] font-bold uppercase tracking-wider text-lg transition-all duration-300"
            >
              Договор оферты
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          color: var(--text-color);
        }
        .nav-link:hover {
          color: var(--neon-pink);
          text-shadow: 0 0 8px var(--neon-pink);
        }
        .mobile-menu-btn {
          position: relative;
        }
        .mobile-menu-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-pink), transparent);
          transition: width 0.3s ease;
        }
        .mobile-menu-btn:hover {
          color: var(--neon-pink);
          text-shadow: 0 0 10px var(--neon-pink);
        }
        .mobile-menu-btn:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  )
}
