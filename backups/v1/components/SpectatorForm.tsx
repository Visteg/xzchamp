'use client'

import { useState, useEffect } from 'react'

interface SpectatorFormProps {
  onClose: () => void
}

export default function SpectatorForm({ onClose }: SpectatorFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    telegram: '',
    city: '',
    ticketType: '',
    agreePrivacy: false,
    agreeOffer: false,
  })

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Spectator form submitted:', formData)
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
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="relative bg-[var(--bg-color)] border-2 border-white/50 rounded-3xl max-w-lg w-full shadow-[0_0_40px_rgba(255,255,255,0.3)] max-h-[90vh] overflow-y-auto my-auto"
        style={{
          animation: 'modalSlideIn 0.3s ease-out'
        }}
      >
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
                  Я согласен с <a href="#privacy" className="text-white/80 hover:underline">политикой конфиденциальности</a>
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-white/20 border-2 border-white/50 text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 mt-6"
            >
              Отправить заявку
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
