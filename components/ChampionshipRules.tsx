'use client'

import { useState, type ReactNode } from 'react'

interface AccordionItem {
  title: string
  content: ReactNode
}

const accordionData: AccordionItem[] = [
  {
    title: 'РАСПИСАНИЕ',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold text-base mb-3">23 мая 2026 г.</h4>
          <ul className="space-y-1.5 ml-2">
            <li>— Открытие площадки / старт регистрации участников и зрителей</li>
            <li>— Прогоны на сцене — блок Babies Star (только команды)</li>
            <li>— Начало первого блока</li>
            <li>— Награждение</li>
            <li>— Перерыв</li>
            <li>— Прогоны на сцене — блок Kids (только команды)</li>
            <li>— Начало второго блока</li>
            <li>— Награждение</li>
            <li>— Перерыв</li>
            <li>— Прогоны на сцене — блок Teens (только команды)</li>
            <li>— Начало третьего блока</li>
            <li>— Награждение</li>
            <li>— Закрытие первого дня чемпионата</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-3">24 мая 2026 г.</h4>
          <ul className="space-y-1.5 ml-2">
            <li>— Открытие площадки / старт регистрации участников и зрителей</li>
            <li>— Прогоны на сцене — блок Adults (только команды)</li>
            <li>— Начало первого блока</li>
            <li>— Награждение</li>
            <li>— Перерыв</li>
            <li>— Прогоны на сцене — блок Ladies (только команды)</li>
            <li>— Начало второго блока</li>
            <li>— Награждение</li>
            <li>— Шоу-кейсы от судей</li>
            <li>— Закрытие второго дня чемпионата</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'СПИСОК НОМИНАЦИЙ',
    content: (
      <div className="space-y-6">
        {/* 23 мая */}
        <div>
          <h4 className="text-white font-bold text-base mb-3">23 мая</h4>

          <div className="mb-4">
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">BABIE&apos;S STAR</h5>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>solo</li>
              <li>duo</li>
              <li>crew</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">KIDS</h5>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>solo contemporary lvl beg</li>
              <li>solo contemporary lvl pro</li>
              <li>solo street lvl beg</li>
              <li>solo street lvl pro</li>
              <li>duo</li>
              <li>crew contemporary</li>
              <li>crew street</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">TEENS</h5>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>solo contemporary lvl beg</li>
              <li>solo contemporary lvl pro</li>
              <li>solo street lvl beg</li>
              <li>solo street lvl pro</li>
              <li>solo afro fusion</li>
              <li>duo lvl beg</li>
              <li>duo lvl pro</li>
              <li>crew contemporary lvl beg</li>
              <li>crew contemporary lvl pro</li>
              <li>crew street lvl beg</li>
              <li>crew street lvl pro</li>
            </ul>
          </div>
        </div>

        {/* 24 мая */}
        <div>
          <h4 className="text-white font-bold text-base mb-3">24 мая</h4>

          <div className="mb-4">
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">ADULTS</h5>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>solo contemporary lvl beg</li>
              <li>solo contemporary lvl pro</li>
              <li>duo contemporary lvl beg</li>
              <li>duo contemporary lvl pro</li>
              <li>crew contemporary lvl beg</li>
              <li>crew contemporary lvl pro</li>
              <li>solo afro fusion</li>
              <li>solo street lvl beg</li>
              <li>solo street lvl pro</li>
              <li>duo street lvl beg</li>
              <li>duo street lvl pro</li>
              <li>crew street lvl beg</li>
              <li>crew street lvl pro</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">LADIES</h5>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>solo heels lvl beg</li>
              <li>solo heels lvl pro</li>
              <li>solo strip lvl beg</li>
              <li>solo strip lvl pro</li>
              <li>duo lvl beg</li>
              <li>duo lvl pro</li>
              <li>crew lvl beg</li>
              <li>crew lvl pro</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'ВОЗРАСТНЫЕ ОГРАНИЧЕНИЯ',
    content: (
      <div className="space-y-3">
        <ul className="space-y-2">
          <li><span className="text-[var(--neon-pink)] font-semibold">Babie&apos;s Star</span> — до 8 лет</li>
          <li><span className="text-[var(--neon-pink)] font-semibold">Kids</span> — 8–11 лет</li>
          <li><span className="text-[var(--neon-pink)] font-semibold">Teens</span> — 12–15 лет</li>
          <li><span className="text-[var(--neon-pink)] font-semibold">Adults</span> — от 16 лет и старше</li>
          <li><span className="text-[var(--neon-pink)] font-semibold">Ladies</span> — от 16 лет и старше</li>
        </ul>
        <p className="text-gray-500 text-xs mt-4">До 20 % участников в команде могут не соответствовать возрастным критериям.</p>
      </div>
    ),
  },
  {
    title: 'УРОВНИ',
    content: (
      <div className="space-y-4">
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">LVL BEG</h5>
          <p>Начинающие танцоры с опытом от 0 до 2 лет.</p>
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">LVL PRO</h5>
          <p>Продолжающие танцоры с опытом от 2 лет.</p>
        </div>
        <p className="text-gray-500 text-xs mt-4">Преподаватели допускаются в номинацию LVL BEG, если объективно оценивают свой танцевальный уровень как начинающий.</p>
      </div>
    ),
  },
  {
    title: 'КРИТЕРИИ ОЦЕНКИ',
    content: (
      <div className="space-y-4">
        <p className="text-white font-bold mb-2">Распределение баллов по критериям:</p>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold">1. Хореография — 50 %</h5>
          <p className="ml-4">Оригинальность, сложность, стиль, тематика, композиция, переходы, креативность.</p>
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold">2. Техника — 40 %</h5>
          <p className="ml-4">Исполнение, музыкальность, чистота, динамика, уровни.</p>
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold">3. Артистизм — 9 %</h5>
          <p className="ml-4">Уверенность исполнения, энергетика, игра лицом.</p>
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold">4. Внешний вид — 1 %</h5>
          <p className="ml-4">Костюмы, оригинальность, креативность.</p>
        </div>
      </div>
    ),
  },
  {
    title: 'СРОКИ РЕГИСТРАЦИИ, ВЗНОСЫ ЗА УЧАСТИЕ',
    content: (
      <div className="space-y-6">
        {/* Периоды */}
        <div className="space-y-4">
          <div>
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">9 февраля – 16 февраля 2026 г. (включительно)</h5>
            <ul className="ml-4 space-y-0.5">
              <li>Solo — 1 900 ₽</li>
              <li>Duo — 1 800 ₽</li>
              <li>Crew — 1 700 ₽</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">17 февраля – 31 марта 2026 г. (включительно)</h5>
            <ul className="ml-4 space-y-0.5">
              <li>Solo — 2 300 ₽</li>
              <li>Duo — 2 200 ₽</li>
              <li>Crew — 1 900 ₽</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[var(--neon-pink)] font-semibold mb-1">1 апреля – 15 мая 2026 г. (включительно)</h5>
            <ul className="ml-4 space-y-0.5">
              <li>Solo — 2 600 ₽</li>
              <li>Duo — 2 500 ₽</li>
              <li>Crew — 2 200 ₽</li>
            </ul>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div>
            <h5 className="text-white font-semibold mb-1">Срок регистрации</h5>
            <p>Регистрация участников открыта до 15 мая 2026 года включительно.</p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-1">Ограничение по количеству участников</h5>
            <p>Для каждой номинации установлено максимальное число участников. Приём заявок в номинации прекращается досрочно при достижении лимита. В этом случае регистрация может быть закрыта ранее 15 мая 2026 года.</p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-1">Лист ожидания</h5>
            <p>Заявки, поданные после закрытия регистрации, попадают в лист ожидания. Участники могут быть допущены к участию при появлении свободных мест.</p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-1">Подтверждение регистрации</h5>
            <p>Регистрация считается завершённой только после полной (100 %) оплаты взноса за участие.</p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-1">Требования к музыкальным материалам</h5>
            <p>Участники, приславшие музыку после 15 мая 2026 года, будут дисквалифицированы без возврата оплаченного взноса.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'ЗРИТЕЛЬСКИЕ БИЛЕТЫ',
    content: (
      <div className="space-y-4">
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">До 22 мая 2026 года</h5>
          <ul className="ml-4 space-y-0.5">
            <li>Зрительский зал — 800 ₽</li>
            <li>VIP-зона — 1 100 ₽</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">В день чемпионата</h5>
          <ul className="ml-4 space-y-0.5">
            <li>Зрительский зал — 1 200 ₽</li>
            <li>VIP-зона — 1 500 ₽</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'ТРЕБОВАНИЯ К МУЗЫКЕ',
    content: (
      <div className="space-y-5">
        <p>Срок сдачи: <span className="text-white font-semibold">до 15 мая 2026 г. включительно.</span></p>

        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">1. Ограничения по времени</h5>
          <ul className="ml-4 space-y-0.5">
            <li>Solo — до 2 мин 30 сек</li>
            <li>Duo — до 3 мин 00 сек</li>
            <li>Crew — до 5 мин 00 сек</li>
          </ul>
          <p className="ml-4 mt-2 text-gray-500 text-xs">Штраф за превышение: каждая дополнительная секунда = –0,1 балла.</p>
        </div>

        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">2. Порядок сдачи музыкального трека</h5>
          <p className="ml-4">Готовый файл необходимо отправить ассистенту в Telegram: <a href="https://t.me/proexz_assistant" target="_blank" rel="noopener noreferrer" className="text-[var(--neon-blue)] hover:underline">@PROEXZ_ASSISTANT</a></p>
        </div>

        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">3. Требования к цензуре</h5>
          <p className="ml-4">В фонограммах для номинаций Babies Star, Kids, Juniors запрещено использовать нецензурную лексику (на любом языке), включать политические мотивы.</p>
          <p className="ml-4 mt-1">Все недопустимые фрагменты должны быть удалены либо заглушены.</p>
        </div>

        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">4. Важные условия</h5>
          <p className="ml-4">Несоблюдение требований ведёт к автоматической дисквалификации участника (солиста, дуэта или команды).</p>
        </div>

        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">5. Формат подписи трека</h5>
          <p className="ml-4 mb-2">Имя файла должно строго соответствовать образцу:</p>
          <p className="ml-4 text-white font-mono text-xs bg-white/5 rounded-lg px-3 py-2 inline-block">BEST_CREW - ADULTSCREWLVLBEG - ТОЧКА - 89000000000</p>
          <p className="ml-4 mt-2">Требования к файлу: формат MP3</p>
        </div>
      </div>
    ),
  },
  {
    title: 'ПРАВИЛА ИСПОЛЬЗОВАНИЯ РЕКВИЗИТА',
    content: (
      <div className="space-y-3">
        <p>Запрещается использовать реквизит, который может:</p>
        <ul className="list-disc list-inside ml-2 space-y-0.5">
          <li>загрязнить сценическое покрытие;</li>
          <li>повредить сценическое покрытие.</li>
        </ul>
        <p>После завершения выступления участник обязан немедленно убрать со сцены весь использованный реквизит.</p>
        <p className="text-gray-500 text-xs mt-2">Невыполнение указанных требований влечёт автоматическую дисквалификацию участника (солиста, дуэта или команды).</p>
      </div>
    ),
  },
  {
    title: 'ПРАВИЛА ВХОДА ДЛЯ РУКОВОДИТЕЛЕЙ, ХОРЕОГРАФОВ И СОПРОВОЖДАЮЩИХ',
    content: (
      <div className="space-y-4">
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">1. Сопровождение команд</h5>
          <ul className="ml-4 space-y-1">
            <li>Команда до 20 человек — бесплатно допускается 1 руководитель.</li>
            <li>Команда от 20 человек — бесплатно допускаются 2 руководителя.</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">2. Сопровождение детей родителями</h5>
          <p className="ml-4">Родитель, сопровождающий ребёнка до момента выступления, может бесплатно находиться на территории комплекса.</p>
          <p className="ml-4 mt-1">Для пребывания в зрительском зале родителю необходимо приобрести зрительский билет.</p>
        </div>
      </div>
    ),
  },
  {
    title: 'НАГРАЖДЕНИЕ',
    content: (
      <div className="space-y-3">
        <p>Денежный призовой фонд будет распределён между победителями в номинациях. Список номинаций опубликуют позднее.</p>
        <p>Все победители и призёры получат эксклюзивную наградную продукцию и ценные призы от партнёров.</p>
        <p>Каждый участник чемпионата получит оценочные листы с комментариями судей, сертификат участника, фото- и видеоматериалы с мероприятия.</p>
      </div>
    ),
  },
  {
    title: 'МЕСТО ПРОВЕДЕНИЯ ЧЕМПИОНАТА И СЦЕНА',
    content: (
      <div className="space-y-4">
        <div className="rounded-xl overflow-hidden">
          <img src="/scene.jpg" alt="Сцена" className="w-full h-auto object-cover" />
        </div>
        <div>
          <h5 className="text-[var(--neon-pink)] font-semibold mb-1">23–24 мая</h5>
          <p className="text-white font-semibold">Концертный зал «Пересвет Арена»</p>
          <a href="https://yandex.ru/maps/-/CPEfnEje" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[var(--neon-blue)] hover:underline transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Целиноградская ул., 3, Ростов-на-Дону
          </a>
          <p className="text-gray-500 text-xs mt-1">Нажмите на адрес, чтобы открыть точное место на карте</p>
        </div>
        <div className="border-t border-white/10 pt-3 space-y-1">
          <p>Размер сцены: 12 м. × 10 м.</p>
          <p>Покрытие сцены: сценический линолеум, цвет чёрный</p>
        </div>
      </div>
    ),
  }
]

export default function ChampionshipRules() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const toggleAccordion = (index: number) => {
    setOpenIndices(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <section id="championship" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-['Unbounded'] text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="chrome-text">Положение чемпионата</span>
        </h2>

        <div className="space-y-1">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className="border-b border-white/10"
            >
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
                    color: openIndices.has(index) ? 'var(--neon-blue)' : 'var(--neon-pink)',
                  }}
                >
                  {openIndices.has(index) ? '−' : '+'}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndices.has(index) ? 'max-h-[5000px] opacity-100 pb-5' : 'max-h-0 opacity-0'
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
