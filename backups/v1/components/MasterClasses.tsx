'use client'

import { useState } from 'react'
import MasterclassForm from './MasterclassForm'

interface ClassPackage {
  title: string
  description: string
  instructors: string
  schedule: string[]
}

const packages: ClassPackage[] = [
  {
    title: 'FULL PASS',
    description: '5 Мастер - классов от хореографов по направлениям: .....',
    instructors: 'От хореографов: ......',
    schedule: ['12:00-', '13:00 -', '14:00', 'перерыв', '15:00 -', '16:00']
  },
  {
    title: 'Street block',
    description: '3 Мастер - классов от хореографов по направлениям: .....',
    instructors: 'От хореографов: ......',
    schedule: ['12:00-', '13:00 -', '14:00']
  },
  {
    title: 'Lady block',
    description: '3 Мастер - классов от хореографов по направлениям: .....',
    instructors: 'От хореографов: ......',
    schedule: ['12:00-', '13:00 -', '14:00']
  }
]

export default function MasterClasses() {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})
  const [isFormOpen, setIsFormOpen] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <section id="masterclasses" className="py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-12">
        <h2 className="font-['Unbounded'] text-3xl md:text-4xl font-bold text-center">
          <span className="chrome-text">Мастер - классы</span>
        </h2>

        {/* Video placeholder */}
        <div className="relative group">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 flex items-center justify-center aspect-video border border-white/10">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Видео</p>
            </div>
          </div>
        </div>

        {/* Purchase button */}
        <div className="flex justify-center">
          <button onClick={() => setIsFormOpen(true)} className="chrome-btn">
            Купить мастер-классы
          </button>
        </div>

        {/* Masterclass Form */}
        {isFormOpen && (
          <MasterclassForm onClose={() => setIsFormOpen(false)} />
        )}

        {/* Packages */}
        <div className="space-y-8">
          {packages.map((pkg, index) => (
            <div key={index} className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-sm">
              <h3 className="font-['Unbounded'] text-xl font-bold mb-3" style={{ color: 'var(--neon-blue)' }}>
                {pkg.title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">{pkg.description}</p>
              <p className="text-sm text-gray-400 mb-4">{pkg.instructors}</p>
              <div>
                <p className="text-sm font-semibold mb-2">Расписание:</p>
                <div className="text-sm text-gray-300 space-y-1">
                  {pkg.schedule.map((time, idx) => (
                    <div key={idx}>{time}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional accordions */}
        <div className="space-y-1 pt-4">
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300 group"
            >
              <span className="font-medium text-sm tracking-wide uppercase text-[var(--text-color)] group-hover:text-[var(--neon-pink)]">
                СТОИМОСТЬ
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: expandedSections['price'] ? 'var(--neon-blue)' : 'var(--neon-pink)' }}
              >
                {expandedSections['price'] ? '−' : '+'}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${expandedSections['price'] ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
              <div className="text-gray-400 text-sm">Информация о ценах...</div>
            </div>
          </div>

          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300 group"
            >
              <span className="font-medium text-sm tracking-wide uppercase text-[var(--text-color)] group-hover:text-[var(--neon-pink)]">
                МЕСТО ПРОВЕДЕНИЯ
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: expandedSections['location'] ? 'var(--neon-blue)' : 'var(--neon-pink)' }}
              >
                {expandedSections['location'] ? '−' : '+'}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${expandedSections['location'] ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
              <div className="text-gray-400 text-sm">Адрес проведения мастер-классов...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
