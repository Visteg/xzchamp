'use client'

import { useEffect } from 'react'
import { useFormCache } from '../hooks/useFormCache'
import { useAntiSpam } from '../hooks/useAntiSpam'

interface SpectatorFormProps {
  onClose: () => void
}

export default function SpectatorForm({ onClose }: SpectatorFormProps) {
  const [formData, setFormData, clearFormCache] = useFormCache('spectator-form', {
    fullName: '',
    phone: '',
    telegram: '',
    city: '',
    ticketType: '',
    agreePrivacy: false,
    agreeOffer: false,
  })

  const { honeypotRef, validateSubmit, startCooldown, cooldownLeft, isDisabled } = useAntiSpam('spectator')

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSubmit()) return
    console.log('Spectator form submitted:', formData)
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

  return (
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
        className="relative rounded-3xl max-w-lg w-full shadow-[0_0_60px_rgba(255,255,255,0.15),inset_0_0_60px_rgba(255,255,255,0.05)] max-h-[90vh] overflow-y-auto my-auto"
        style={{
          animation: 'modalSlideIn 0.3s ease-out',
          background: 'linear-gradient(135deg, rgba(25,25,35,0.9) 0%, rgba(15,15,20,0.95) 100%)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
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
            <span className="chrome-text">Регистрация зрителя</span>
          </h3>

          {/* Info Text */}
          <p className="text-sm text-gray-400 text-center mb-8 leading-relaxed">
            После оставленной заявки на регистрацию с вами свяжется менеджер в течение 24 часов.
            <br /><br />
            Если менеджер не связался с вами в течении указанного времени – напишите в чат поддержки.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ФИО зрителя */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="ФИО зрителя"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-white/60 transition-all duration-300"
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
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-white/60 transition-all duration-300"
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
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-white/60 transition-all duration-300"
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
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-white/60 transition-all duration-300"
              />
            </div>

            {/* Выбор билета */}
            <div>
              <select
                name="ticketType"
                value={formData.ticketType}
                onChange={handleInputChange}
                required
                className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-white/60 transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1.5rem center',
                }}
              >
                <option value="" disabled>выбрать билет</option>
                <option value="standard">Стандартный</option>
                <option value="vip">VIP</option>
                <option value="all-days">Все дни</option>
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
                  className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-white/80 checked:border-white/80 focus:outline-none cursor-pointer transition-all duration-300"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Я согласен с <a href="/xzchamp/privacy" target="_blank" className="text-white/80 hover:underline">политикой конфиденциальности</a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeOffer"
                  checked={formData.agreeOffer}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-white/80 checked:border-white/80 focus:outline-none cursor-pointer transition-all duration-300"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Я ознакомился с <a href="#offer" className="text-white/80 hover:underline">договором оферты</a>
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
              className={`w-full py-4 px-6 rounded-full border-2 text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 mt-6 ${isDisabled ? 'bg-gray-600 border-gray-500 cursor-not-allowed opacity-50' : 'bg-white/20 border-white/50 hover:bg-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105'}`}
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
}
