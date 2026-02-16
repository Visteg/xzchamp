const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TELEGRAM_REGEX = /^@?[a-zA-Z][a-zA-Z0-9_]{4,}$/
const PHONE_DIGIT_REGEX = /(\d.*){7,}/

interface FieldRule {
  field: string
  label: string
  required?: boolean
  type?: 'email' | 'phone' | 'telegram'
}

const RULES: Record<string, FieldRule[]> = {
  solo: [
    { field: 'fullName', label: 'ФИО', required: true },
    { field: 'phone', label: 'Телефон', required: true, type: 'phone' },
    { field: 'telegram', label: 'Telegram', required: true, type: 'telegram' },
    { field: 'birthDate', label: 'Дата рождения', required: true },
    { field: 'email', label: 'Email', required: true, type: 'email' },
    { field: 'city', label: 'Город', required: true },
    { field: 'nomination', label: 'Номинация', required: true },
  ],
  duet: [
    { field: 'email', label: 'Email', required: true, type: 'email' },
    { field: 'city', label: 'Город', required: true },
    { field: 'nomination', label: 'Номинация', required: true },
    { field: 'fullName1', label: 'ФИО первого участника', required: true },
    { field: 'birthDate1', label: 'Дата рождения первого участника', required: true },
    { field: 'phone1', label: 'Телефон первого участника', required: true, type: 'phone' },
    { field: 'telegram1', label: 'Telegram первого участника', required: true, type: 'telegram' },
    { field: 'fullName2', label: 'ФИО второго участника', required: true },
    { field: 'birthDate2', label: 'Дата рождения второго участника', required: true },
    { field: 'phone2', label: 'Телефон второго участника', required: true, type: 'phone' },
    { field: 'telegram2', label: 'Telegram второго участника', required: true, type: 'telegram' },
  ],
  team: [
    { field: 'teamName', label: 'Название команды', required: true },
    { field: 'leaderName', label: 'ФИО руководителя', required: true },
    { field: 'leaderPhone', label: 'Телефон руководителя', required: true, type: 'phone' },
    { field: 'leaderTelegram', label: 'Telegram руководителя', required: true, type: 'telegram' },
    { field: 'email', label: 'Email', required: true, type: 'email' },
    { field: 'city', label: 'Город', required: true },
    { field: 'nomination', label: 'Номинация', required: true },
    { field: 'participantsCount', label: 'Количество участников', required: true },
    { field: 'participantsDetails', label: 'Данные участников', required: true },
  ],
  masterclass: [
    { field: 'fullName', label: 'ФИО', required: true },
    { field: 'phone', label: 'Телефон', required: true, type: 'phone' },
    { field: 'telegram', label: 'Telegram', required: true, type: 'telegram' },
    { field: 'city', label: 'Город', required: true },
    { field: 'selectedClasses', label: 'Выбранные классы', required: true },
  ],
  spectator: [
    { field: 'fullName', label: 'ФИО', required: true },
    { field: 'phone', label: 'Телефон', required: true, type: 'phone' },
    { field: 'telegram', label: 'Telegram', required: true, type: 'telegram' },
    { field: 'city', label: 'Город', required: true },
    { field: 'ticketType', label: 'Тип билета', required: true },
  ],
}

export function validateForm(category: string, data: Record<string, string | boolean>): string | null {
  const rules = RULES[category]
  if (!rules) return null

  for (const rule of rules) {
    const value = data[rule.field]
    const str = typeof value === 'string' ? value.trim() : ''

    if (rule.required && !str) {
      return `Заполните поле "${rule.label}"`
    }

    if (str && rule.type === 'email' && !EMAIL_REGEX.test(str)) {
      return 'Некорректный формат email'
    }

    if (str && rule.type === 'phone' && !PHONE_DIGIT_REGEX.test(str)) {
      return `Некорректный номер телефона (${rule.label})`
    }

    if (str && rule.type === 'telegram' && !TELEGRAM_REGEX.test(str)) {
      return `Некорректный Telegram ник (${rule.label}). Формат: @username`
    }
  }

  return null
}
