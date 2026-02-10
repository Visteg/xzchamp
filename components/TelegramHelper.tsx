'use client'

import { useState, useEffect } from 'react'

export default function TelegramHelper() {
  const [isVisible, setIsVisible] = useState(false)
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const socialSection = document.querySelector('#social')
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Check if we're in the social media section
      if (socialSection) {
        const socialRect = socialSection.getBoundingClientRect()
        const isInSocialSection = socialRect.top < windowHeight && socialRect.bottom > 0

        if (isInSocialSection) {
          setIsVisible(false)
          setShowBubble(false)
          return
        }
      }

      // Show button after scrolling past the hero section
      if (scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setShowBubble(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Periodic speech bubble: show for 5 seconds every 15 seconds
    if (isVisible) {
      const showBubbleTimer = setTimeout(() => {
        setShowBubble(true)

        // Hide bubble after 5 seconds
        const hideBubbleTimer = setTimeout(() => {
          setShowBubble(false)
        }, 5000)

        return () => clearTimeout(hideBubbleTimer)
      }, 10000)

      // Repeat every 15 seconds
      const intervalTimer = setInterval(() => {
        setShowBubble(true)
        setTimeout(() => setShowBubble(false), 5000)
      }, 20000)

      return () => {
        clearTimeout(showBubbleTimer)
        clearInterval(intervalTimer)
      }
    }
  }, [isVisible])

  const openTelegram = () => {
    window.open('https://t.me/proexz_assistant', '_blank')
  }

  return (
    <button
      onClick={openTelegram}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
      style={{
        animation: isVisible ? 'float-helper 3s ease-in-out infinite' : 'none'
      }}
      aria-label="Открыть Telegram помощника"
    >
      <div className="relative group">
        {/* Speech Bubble */}
        <div
          className={`absolute bottom-full right-0 mb-4 mr-2 transition-all duration-500 ${
            showBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          style={{
            animation: showBubble ? 'bubble-float 2s ease-in-out infinite' : 'none'
          }}
        >
          <div className="relative px-4 py-3 rounded-2xl shadow-lg whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(255, 0, 204, 0.15) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
            }}
          >
            <p className="text-white text-sm md:text-base font-['Unbounded'] font-semibold">
              Остались вопросы?<br />Я помогу! 🩷
            </p>
            {/* Speech bubble tail */}
            <div
              className="absolute top-full right-6"
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '12px solid rgba(0, 240, 255, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Robot image */}
        <img
          src="/proexz robot.png"
          alt="Telegram Helper Robot"
          className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.6))'
          }}
        />

        {/* Pulsing glow effect */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(10px)',
            animation: 'pulse-glow 2s ease-in-out infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float-helper {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        @keyframes bubble-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </button>
  )
}
