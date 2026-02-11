'use client'

import { useState, useCallback } from 'react'

const TOTAL_PHOTOS = 55

// Generate photo paths
const allPhotos = Array.from({ length: TOTAL_PHOTOS }, (_, i) => `/memories/${i + 1}.jpg`)

// Split into 3 rows
const row1 = allPhotos.slice(0, 19)
const row2 = allPhotos.slice(19, 37)
const row3 = allPhotos.slice(37, 55)

function MarqueeRow({ images, direction, speed }: { images: string[]; direction: 'left' | 'right'; speed: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleClick = useCallback((globalIndex: number) => {
    setLightboxIndex(globalIndex)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % TOTAL_PHOTOS : null)
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS : null)
  }, [])

  return (
    <>
      <div className="overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{
            animation: `marquee-${direction} ${speed}s linear infinite`,
          }}
        >
          {/* Double the images for seamless loop */}
          {[...images, ...images].map((src, i) => {
            const originalIndex = allPhotos.indexOf(src)
            return (
              <div
                key={`${direction}-${i}`}
                className="flex-shrink-0 w-48 h-32 md:w-64 md:h-44 rounded-xl overflow-hidden cursor-pointer group relative"
                onClick={() => handleClick(originalIndex)}
              >
                <img
                  src={src}
                  alt={`Фото ${originalIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 md:left-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Предыдущая"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={allPhotos[lightboxIndex]}
            alt={`Фото ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 md:right-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Следующая"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-['Unbounded'] text-sm">
            {lightboxIndex + 1} / {TOTAL_PHOTOS}
          </div>
        </div>
      )}
    </>
  )
}

export default function Memories() {
  return (
    <section id="memories" className="py-16 overflow-hidden">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="font-['Unbounded'] text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="chrome-text">Воспоминания</span>
        </h2>
      </div>

      <div className="space-y-3">
        <MarqueeRow images={row1} direction="left" speed={60} />
        <MarqueeRow images={row2} direction="right" speed={70} />
        <MarqueeRow images={row3} direction="left" speed={55} />
      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
