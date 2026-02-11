'use client'

import { useEffect } from 'react'
import { useFormCache } from '../hooks/useFormCache'
import { useAntiSpam } from '../hooks/useAntiSpam'

interface RegistrationFormProps {
  category: 'solo' | 'duet' | 'team' | 'masterclass' | 'spectator'
  onClose: () => void
}

export default function RegistrationForm({ category, onClose }: RegistrationFormProps) {
  const [formData, setFormData, clearFormCache] = useFormCache(`registration-form-${category}`, {
    // Solo fields
    fullName: '',
    phone: '',
    telegram: '',
    email: '',
    birthDate: '',
    city: '',
    nomination: '',
    // Duet fields
    duetName: '',
    fullName1: '',
    birthDate1: '',
    phone1: '',
    telegram1: '',
    fullName2: '',
    birthDate2: '',
    phone2: '',
    telegram2: '',
    // Team fields
    teamName: '',
    leaderName: '',
    leaderPhone: '',
    leaderTelegram: '',
    participantsCount: '',
    // Masterclass fields
    selectedClasses: '',
    // Spectator fields
    ticketType: '',
    // Checkboxes
    agreePrivacy: false,
    agreeOffer: false,
  })

  // Team participants state
  const [teamParticipants, setTeamParticipants, clearParticipantsCache] = useFormCache<Array<{ fullName: string; birthDate: string }>>(`registration-form-${category}-participants`, [])

  const { honeypotRef, validateSubmit, startCooldown, cooldownLeft, isDisabled } = useAntiSpam(`registration-${category}`)

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const getCategoryTitle = () => {
    switch (category) {
      case 'solo':
        return 'Регистрация соло'
      case 'duet':
        return 'Регистрация дуэт'
      case 'team':
        return 'Регистрация команды'
      case 'masterclass':
        return 'Регистрация мастер-классы'
      case 'spectator':
        return 'Регистрация зрителя'
      default:
        return 'Регистрация'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSubmit()) return
    // TODO: Обработка отправки формы
    const submitData = category === 'team'
      ? { category, ...formData, participants: teamParticipants }
      : { category, ...formData }
    console.log('Form submitted:', submitData)
    clearFormCache()
    clearParticipantsCache()
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

  const handleParticipantsCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value) || 0
    setFormData(prev => ({ ...prev, participantsCount: e.target.value }))

    // Initialize participants array with empty values
    const newParticipants = Array.from({ length: count }, (_, i) => ({
      fullName: teamParticipants[i]?.fullName || '',
      birthDate: teamParticipants[i]?.birthDate || '',
    }))
    setTeamParticipants(newParticipants)
  }

  const handleParticipantChange = (index: number, field: 'fullName' | 'birthDate', value: string) => {
    setTeamParticipants(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
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
        className="relative rounded-3xl max-w-lg w-full shadow-[0_0_80px_var(--neon-pink),inset_0_0_80px_rgba(255,0,204,0.1)] max-h-[90vh] overflow-y-auto my-auto"
        style={{
          animation: 'modalSlideIn 0.3s ease-out',
          background: 'linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(10,10,15,0.95) 100%)',
          border: '1px solid rgba(255,0,204,0.3)',
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
          <span className="chrome-text">{getCategoryTitle()}</span>
        </h3>

        {/* Info Text */}
        <p className="text-sm text-gray-400 text-center mb-8 leading-relaxed">
          После оставленной заявки на регистрацию с вами свяжется менеджер в течение 24 часов.
          <br /><br />
          Если менеджер не связался с вами в течении указанного времени – напишите в чат поддержки.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Duet Name (only for duet) */}
          {category === 'duet' && (
            <>
              <div>
                <input
                  type="text"
                  name="duetName"
                  placeholder="название дуэта (если есть)"
                  value={formData.duetName}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Email for duet */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="эл почта"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Город for duet */}
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="город"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Номинация for duet */}
              <div>
                <select
                  name="nomination"
                  value={formData.nomination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.5rem center',
                  }}
                >
                  <option value="" disabled>Номинация</option>
                  <option value="hip-hop">Hip-Hop</option>
                  <option value="breaking">Breaking</option>
                  <option value="popping">Popping</option>
                  <option value="locking">Locking</option>
                  <option value="house">House</option>
                  <option value="dancehall">Dancehall</option>
                  <option value="contemporary">Contemporary</option>
                </select>
              </div>
            </>
          )}

          {/* Solo Fields */}
          {category === 'solo' && (
            <>
              {/* ФИО */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ФИО"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Дата рождения */}
              <div className="date-input-wrapper">
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
                <label>дата рождения</label>
              </div>

              {/* Email for solo */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="эл почта"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Город for solo */}
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="город"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Номинация for solo */}
              <div>
                <select
                  name="nomination"
                  value={formData.nomination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.5rem center',
                  }}
                >
                  <option value="" disabled>Номинация</option>
                  <option value="hip-hop">Hip-Hop</option>
                  <option value="breaking">Breaking</option>
                  <option value="popping">Popping</option>
                  <option value="locking">Locking</option>
                  <option value="house">House</option>
                  <option value="dancehall">Dancehall</option>
                  <option value="contemporary">Contemporary</option>
                </select>
              </div>
            </>
          )}

          {/* Duet Fields - Two Participants */}
          {category === 'duet' && (
            <>
              {/* Participant 1 Header */}
              <div className="pt-4 pb-2">
                <h4 className="text-white font-['Unbounded'] font-bold text-sm uppercase tracking-wide text-center">
                  Заполните информацию о первом участнике
                </h4>
              </div>

              {/* Participant 1 */}
              <div>
                <input
                  type="text"
                  name="fullName1"
                  placeholder="ФИО (первого участника)"
                  value={formData.fullName1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              <div className="date-input-wrapper">
                <input
                  type="date"
                  name="birthDate1"
                  value={formData.birthDate1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
                <label>дата рождения (первый участник)</label>
              </div>

              <div>
                <input
                  type="tel"
                  name="phone1"
                  placeholder="номер телефона (первого участника)"
                  value={formData.phone1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="telegram1"
                  placeholder="@ТГ ник (первого участика)"
                  value={formData.telegram1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Participant 2 Header */}
              <div className="pt-6 pb-2">
                <h4 className="text-white font-['Unbounded'] font-bold text-sm uppercase tracking-wide text-center">
                  Заполните информацию о втором участнике
                </h4>
              </div>

              {/* Participant 2 */}
              <div>
                <input
                  type="text"
                  name="fullName2"
                  placeholder="ФИО (второго участника)"
                  value={formData.fullName2}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              <div className="date-input-wrapper">
                <input
                  type="date"
                  name="birthDate2"
                  value={formData.birthDate2}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
                <label>дата рождения (второй участник)</label>
              </div>

              <div>
                <input
                  type="tel"
                  name="phone2"
                  placeholder="номер телефона (второго участника)"
                  value={formData.phone2}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="telegram2"
                  placeholder="@ТГ ник (второго участника)"
                  value={formData.telegram2}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>
            </>
          )}

          {/* Team Fields */}
          {category === 'team' && (
            <>
              {/* Team Name */}
              <div>
                <input
                  type="text"
                  name="teamName"
                  placeholder="название команды"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Leader Name */}
              <div>
                <input
                  type="text"
                  name="leaderName"
                  placeholder="ФИО руководителя"
                  value={formData.leaderName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Leader Phone */}
              <div>
                <input
                  type="tel"
                  name="leaderPhone"
                  placeholder="номер телефона руководителя"
                  value={formData.leaderPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Leader Telegram */}
              <div>
                <input
                  type="text"
                  name="leaderTelegram"
                  placeholder="@ТГ руководителя"
                  value={formData.leaderTelegram}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Email for team */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="эл.почта для связи"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* City for team */}
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="город"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Nomination for team */}
              <div>
                <select
                  name="nomination"
                  value={formData.nomination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.5rem center',
                  }}
                >
                  <option value="" disabled>Номинация</option>
                  <option value="hip-hop">Hip-Hop</option>
                  <option value="breaking">Breaking</option>
                  <option value="popping">Popping</option>
                  <option value="locking">Locking</option>
                  <option value="house">House</option>
                  <option value="dancehall">Dancehall</option>
                  <option value="contemporary">Contemporary</option>
                </select>
              </div>

              {/* Participants Count Selector */}
              <div className="pt-4">
                <select
                  name="participantsCount"
                  value={formData.participantsCount}
                  onChange={handleParticipantsCountChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.5rem center',
                  }}
                >
                  <option value="" disabled>Количество участников</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'участник' : num < 5 ? 'участника' : 'участников'}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Participants Fields */}
              {teamParticipants.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h4 className="text-white font-['Unbounded'] font-bold text-sm uppercase tracking-wide text-center">
                    Список участников и даты рождения
                  </h4>

                  {teamParticipants.map((participant, index) => (
                    <div key={index} className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400 font-['Unbounded'] mb-2">
                        Участник {index + 1}
                      </div>
                      <input
                        type="text"
                        placeholder={`ФИО участника ${index + 1}`}
                        value={participant.fullName}
                        onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                        required
                        className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                      />
                      <div className="date-input-wrapper">
                        <input
                          type="date"
                          value={participant.birthDate}
                          onChange={(e) => handleParticipantChange(index, 'birthDate', e.target.value)}
                          required
                          className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                        />
                        <label>дата рождения</label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Masterclass Fields */}
          {category === 'masterclass' && (
            <>
              {/* ФИО */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ФИО"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Выбор классов */}
              <div>
                <select
                  name="selectedClasses"
                  value={formData.selectedClasses}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300 appearance-none cursor-pointer"
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
            </>
          )}

          {/* Spectator Fields */}
          {category === 'spectator' && (
            <>
              {/* ФИО зрителя */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="ФИО зрителя"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
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
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white placeholder-gray-500 font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300"
                />
              </div>

              {/* Выбор билета */}
              <div>
                <select
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-3 rounded-full bg-white/5 border-2 border-white/20 text-white font-['Unbounded'] text-sm focus:outline-none focus:border-[var(--neon-pink)] transition-all duration-300 appearance-none cursor-pointer"
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
            </>
          )}

          {/* Checkboxes */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleInputChange}
                required
                className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-[var(--neon-pink)] checked:border-[var(--neon-pink)] focus:outline-none cursor-pointer transition-all duration-300"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Я согласен с <a href="#privacy" className="text-[var(--neon-pink)] hover:underline">политикой конфиденциальности</a>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="agreeOffer"
                checked={formData.agreeOffer}
                onChange={handleInputChange}
                required
                className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-[var(--neon-pink)] checked:border-[var(--neon-pink)] focus:outline-none cursor-pointer transition-all duration-300"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Я ознакомился с <a href="#offer" className="text-[var(--neon-pink)] hover:underline">договором оферты</a>
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
            className={`w-full py-4 px-6 rounded-full text-white font-['Unbounded'] font-bold uppercase tracking-wide transition-all duration-300 mt-6 ${isDisabled ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-[var(--neon-pink)] hover:shadow-[0_0_30px_var(--neon-pink)] hover:scale-105'}`}
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
