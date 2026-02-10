'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useFormCache } from '../hooks/useFormCache'
import { useAntiSpam } from '../hooks/useAntiSpam'

interface MasterclassFormProps {
  onClose: () => void
}

export default function MasterclassForm({ onClose }: MasterclassFormProps) {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData, clearFormCache] = useFormCache('masterclass-form', {
    fullName: '',
    phone: '',
    telegram: '',
    city: '',
    selectedClasses: '',
    agreePrivacy: false,
    agreeOffer: false,
  })

  const { honeypotRef, validateSubmit, startCooldown, cooldownLeft, isDisabled } = useAntiSpam('masterclass')

  // Mount portal and disable body scroll
  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSubmit()) return
    console.log('Masterclass form submitted:', formData)
    clearFormCache()
    startCooldown()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  if (!mounted) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
      style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="relative rounded-3xl max-w-lg w-full shadow-[0_0_80px_var(--neon-blue),inset_0_0_80px_rgba(0,240,255,0.1)] max-h-[90vh] overflow-y-auto my-auto"
        style={{
          animation: 'modalSlideIn 0.3s ease-out',
          background: 'linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(10,10,15,0.95) 100%)',
          border: '1px solid rgba(0,240,255,0.3)',
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
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <h3 className="font-['Unbounded'] text-2xl md:text-3xl font-bold mb-4 text-center">
            <span className="chrome-text">Регистрация мастер-классы</span>
          </h3>

          {/* Info Text */}
          <p className="text-sm text-gray-400 text-center mb-8 leading-relaxed">
            После оставленной заявки на регистрацию с вами свяжется менеджер в течение 24 часов.
            <br /><br />
            Если менеджер не связался с вами в течении указанного времени – напишите в чат поддержки.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ФИО */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="ФИО"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-blue)] transition-all duration-300"
              />
            </div>

            {/* Номер телефона */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="номер телефона"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-blue)] transition-all duration-300"
              />
            </div>

            {/* Telegram */}
            <div>
              <input
                type="text"
                name="telegram"
                placeholder="@ТГ"
                value={formData.telegram}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-blue)] transition-all duration-300"
              />
            </div>

            {/* Город */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="город"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-blue)] transition-all duration-300"
              />
            </div>

            {/* Выбор классов */}
            <div>
              <select
                name="selectedClasses"
                value={formData.selectedClasses}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-blue)] transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1.5rem center',
                }}
              >
                <option value="" disabled>выбрать классы</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="breaking">Breaking</option>
                <option value="popping">Popping</option>
                <option value="locking">Locking</option>
                <option value="house">House</option>
                <option value="dancehall">Dancehall</option>
                <option value="contemporary">Contemporary</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-[var(--neon-blue)] checked:border-[var(--neon-blue)] focus:outline-none cursor-pointer transition-all duration-300"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Я согласен с <a href="#privacy" className="text-[var(--neon-blue)] hover:underline">политикой конфиденциальности</a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeOffer"
                  checked={formData.agreeOffer}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-[var(--neon-blue)] checked:border-[var(--neon-blue)] focus:outline-none cursor-pointer transition-all duration-300"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Я ознакомился с <a href="#offer" className="text-[var(--neon-blue)] hover:underline">договором оферты</a>
                </span>
              </label>
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-500 text-center pt-2">
              Отправляя заявку вы автоматически соглашаетесь с правилами участия чемпионата
            </p>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              ref={honeypotRef}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full py-4 px-6 rounded-full text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 mt-6 ${isDisabled ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-[var(--neon-blue)] hover:shadow-[0_0_30px_var(--neon-blue)] hover:scale-105'}`}
            >
              {isDisabled ? `Подождите ${cooldownLeft} сек.` : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </div>

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
    </div>
  )

  return createPortal(modalContent, document.body)
}
