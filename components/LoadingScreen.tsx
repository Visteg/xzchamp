'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const duration = 3000
    const steps = 60
    const increment = 100 / steps
    const stepDuration = duration / steps
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += increment
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(() => {
          setIsLoaded(true)
        }, 800)
      }
      setProgress(Math.floor(currentProgress))
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  if (isLoaded) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-color)] transition-opacity duration-500 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      {/* Cyber Grid Background */}
      <div className="cyber-grid"></div>

      {/* Neon Glow - Pink stripe under logo */}
      <div
        className="absolute w-[700px] h-[120px] top-[55%]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--neon-pink) 30%, var(--neon-pink) 70%, transparent 100%)',
          filter: 'blur(60px)',
          animation: 'neonFlicker1 5s ease-in-out infinite',
          transform: 'skewY(-3deg)'
        }}
      />

      {/* Neon Glow - Blue scattered */}
      <div
        className="absolute w-[200px] h-[400px] -right-10 top-[20%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, var(--neon-blue) 40%, transparent 100%)',
          filter: 'blur(80px)',
          animation: 'neonFlicker2 6s ease-in-out infinite',
          transform: 'rotate(15deg)'
        }}
      />
      <div
        className="absolute w-[150px] h-[250px] right-[15%] bottom-[10%]"
        style={{
          background: 'radial-gradient(ellipse 100% 60%, var(--neon-blue) 0%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: 0.2,
          animation: 'neonFlicker2 8s ease-in-out infinite reverse'
        }}
      />

      {/* Neon Glow - Center */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--neon-pink) 0%, var(--neon-blue) 50%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'neonPulse 2.5s ease-in-out infinite'
        }}
      />

      {/* Main Percentage Display */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Big Percentage Number */}
        <div className="relative">
          <span
            className="font-['Unbounded'] text-[140px] md:text-[200px] lg:text-[260px] font-black leading-none"
            style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(135deg, var(--neon-pink), var(--neon-blue), var(--neon-pink))',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease-in-out infinite',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            {progress}
          </span>

          {/* Percentage Symbol */}
          <span
            className="absolute -right-6 md:-right-10 top-6 md:top-10 font-['Unbounded'] text-4xl md:text-6xl font-bold"
            style={{
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(135deg, var(--neon-pink), var(--neon-blue))',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease-in-out infinite',
              opacity: 0.7
            }}
          >
            %
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-40 md:w-56 mt-8">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-blue))',
                boxShadow: '0 0 20px var(--neon-pink), 0 0 40px var(--neon-blue)',
                animation: 'glowPulse 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes neonFlicker1 {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.03);
          }
        }

        @keyframes neonFlicker2 {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.02) translateY(-10px);
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          25% {
            opacity: 0.15;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.05);
          }
          75% {
            opacity: 0.2;
            transform: scale(0.98);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 10px var(--neon-pink), 0 0 20px var(--neon-blue);
          }
          50% {
            box-shadow: 0 0 20px var(--neon-pink), 0 0 40px var(--neon-blue);
          }
        }
      `}</style>
    </div>
  )
}
