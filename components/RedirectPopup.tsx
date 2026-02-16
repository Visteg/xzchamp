'use client'

import { useState, useEffect } from 'react'

interface RedirectPopupProps {
  telegramLink: string
  onClose: () => void
}

export default function RedirectPopup({ telegramLink, onClose }: RedirectPopupProps) {
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = telegramLink
      return
    }
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds, telegramLink])

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="relative rounded-3xl max-w-md w-full p-8 md:p-10 text-center"
        style={{
          animation: 'modalSlideIn 0.3s ease-out',
          background: 'linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(10,10,15,0.98) 100%)',
          border: '1px solid rgba(255,0,204,0.3)',
          boxShadow: '0 0 60px rgba(255,0,204,0.2)',
        }}
      >
        {/* Checkmark icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,0,204,0.15)', border: '2px solid var(--neon-pink)' }}>
          <svg className="w-8 h-8 text-[var(--neon-pink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="font-['Unbounded'] text-xl md:text-2xl font-bold text-white mb-3">
          Заявка отправлена!
        </h3>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Сейчас вы будете перенаправлены в Telegram бота для подтверждения регистрации
        </p>

        {/* Timer circle */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle
              cx="40" cy="40" r="36" fill="none"
              stroke="var(--neon-pink)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 36}
              strokeDashoffset={2 * Math.PI * 36 * (1 - seconds / 10)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-white font-['Unbounded'] text-2xl font-bold">
            {seconds}
          </span>
        </div>

        {/* Redirect now button */}
        <button
          onClick={() => { window.location.href = telegramLink }}
          className="w-full py-3 px-6 rounded-full text-white font-['Unbounded'] font-bold text-sm uppercase tracking-wide bg-[var(--neon-pink)] hover:shadow-[0_0_30px_var(--neon-pink)] hover:scale-105 transition-all duration-300 mb-3"
        >
          Перейти сейчас
        </button>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          Закрыть
        </button>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.9) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
