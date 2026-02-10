'use client'

import { useState } from 'react'

interface AccordionItem {
  title: string
  content: string
}

const accordionData: AccordionItem[] = [
  { title: 'РАСПИСАНИЕ', content: 'Здесь будет расписание чемпионата...' },
  { title: 'СПИСОК НОМИНАЦИЙ', content: 'Список всех номинаций чемпионата...' },
  { title: 'ВОЗРАСТНЫЕ ОГРАНИЧЕНИЯ', content: 'Информация о возрастных категориях...' },
  { title: 'УРОВНИ', content: 'Описание уровней сложности...' },
  { title: 'КРИТЕРИИ ОЦЕНКИ', content: 'Критерии, по которым судьи оценивают выступления...' },
  { title: 'СРОКИ РЕГИСТРАЦИИ, ВЗНОСЫ ЗА УЧАСТИЕ', content: 'Информация о сроках и стоимости участия...' },
  { title: 'ТРЕБОВАНИЯ К МУЗЫКЕ', content: 'Технические требования к музыкальному сопровождению...' },
  { title: 'РЕКВИЗИТ', content: 'Правила использования реквизита...' },
  { title: 'ПРАВИЛА ВХОДА ДЛЯ СОПРОВОЖДАЮЩИХ', content: 'Условия доступа для сопровождающих лиц...' },
  { title: 'НАГРАЖДЕНИЕ', content: 'Информация о призах и церемонии награждения...' },
  { title: 'МЕСТО ПРОВЕДЕНИЯ', content: 'Адрес и информация о площадке проведения...' }
]

export default function ChampionshipRules() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="championship" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-['Unbounded'] text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="chrome-text">Положение чемпионата</span>
        </h2>

        <div className="space-y-1">
          {accordionData.map((item, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300 group"
              >
                <span className="font-medium text-sm tracking-wide uppercase text-[var(--text-color)] group-hover:text-[var(--neon-pink)]">
                  {item.title}
                </span>
                <span
                  className="text-2xl font-bold transition-all duration-300"
                  style={{
                    color: openIndex === index ? 'var(--neon-blue)' : 'var(--neon-pink)',
                  }}
                >
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-gray-400 text-sm leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
