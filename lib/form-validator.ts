import { FormCategory } from './types'

const REQUIRED_FIELDS: Record<FormCategory, string[]> = {
  solo: ['fullName', 'phone', 'telegram', 'birthDate', 'email', 'city', 'nomination'],
  duet: ['email', 'city', 'nomination', 'fullName1', 'birthDate1', 'phone1', 'telegram1', 'fullName2', 'birthDate2', 'phone2', 'telegram2'],
  team: ['teamName', 'leaderName', 'leaderPhone', 'leaderTelegram', 'email', 'city', 'nomination', 'participantsCount', 'participantsDetails'],
  masterclass: ['fullName', 'phone', 'telegram', 'city', 'selectedClasses'],
  spectator: ['fullName', 'phone', 'telegram', 'city', 'ticketType'],
}

const FIELD_LABELS: Record<string, string> = {
  fullName: 'ФИО',
  phone: 'Телефон',
  telegram: 'Telegram',
  birthDate: 'Дата рождения',
  email: 'Email',
  city: 'Город',
  nomination: 'Номинация',
  fullName1: 'ФИО первого участника',
  birthDate1: 'Дата рождения первого участника',
  phone1: 'Телефон первого участника',
  telegram1: 'Telegram первого участника',
  fullName2: 'ФИО второго участника',
  birthDate2: 'Дата рождения второго участника',
  phone2: 'Телефон второго участника',
  telegram2: 'Telegram второго участника',
  teamName: 'Название команды',
  leaderName: 'ФИО руководителя',
  leaderPhone: 'Телефон руководителя',
  leaderTelegram: 'Telegram руководителя',
  participantsCount: 'Количество участников',
  participantsDetails: 'Данные участников',
  selectedClasses: 'Выбранные классы',
  ticketType: 'Тип билета',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TELEGRAM_REGEX = /^@?[a-zA-Z][a-zA-Z0-9_]{4,}$/
const PHONE_DIGIT_REGEX = /(\d.*){7,}/

const EMAIL_FIELDS = ['email']
const TELEGRAM_FIELDS = ['telegram', 'telegram1', 'telegram2', 'leaderTelegram']
const PHONE_FIELDS = ['phone', 'phone1', 'phone2', 'leaderPhone']

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateFormData(
  category: FormCategory,
  formData: Record<string, unknown>
): ValidationResult {
  const errors: string[] = []
  const requiredFields = REQUIRED_FIELDS[category]

  for (const field of requiredFields) {
    const value = formData[field]
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      const label = FIELD_LABELS[field] || field
      errors.push(`Поле "${label}" обязательно для заполнения`)
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  for (const field of EMAIL_FIELDS) {
    const value = formData[field]
    if (typeof value === 'string' && value.trim() !== '' && !EMAIL_REGEX.test(value.trim())) {
      errors.push('Некорректный формат email')
    }
  }

  for (const field of PHONE_FIELDS) {
    const value = formData[field]
    if (typeof value === 'string' && value.trim() !== '' && !PHONE_DIGIT_REGEX.test(value)) {
      const label = FIELD_LABELS[field] || field
      errors.push(`Некорректный формат телефона (${label})`)
    }
  }

  for (const field of TELEGRAM_FIELDS) {
    const value = formData[field]
    if (typeof value === 'string' && value.trim() !== '' && !TELEGRAM_REGEX.test(value.trim())) {
      const label = FIELD_LABELS[field] || field
      errors.push(`Некорректный Telegram ник (${label}). Формат: @username`)
    }
  }

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string' && value.length > 2000) {
      const label = FIELD_LABELS[key] || key
      errors.push(`Поле "${label}" слишком длинное (максимум 2000 символов)`)
    }
  }

  return { valid: errors.length === 0, errors }
}
