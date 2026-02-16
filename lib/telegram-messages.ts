import {
  FormCategory,
  FormData,
  SoloFormData,
  DuetFormData,
  TeamFormData,
  MasterclassFormData,
  SpectatorFormData,
} from './types'

const CATEGORY_NAMES: Record<FormCategory, string> = {
  solo: 'Соло',
  duet: 'Дуэт',
  team: 'Команда',
  masterclass: 'Мастер-классы',
  spectator: 'Зритель',
}

export function formatApplicationForUser(category: FormCategory, data: FormData): string {
  const title = `📋 <b>Ваша заявка: ${CATEGORY_NAMES[category]}</b>\n\n`
  let fields = ''

  switch (category) {
    case 'solo': {
      const d = data as SoloFormData
      fields = [
        `<b>ФИО:</b> ${d.fullName}`,
        `<b>Телефон:</b> ${d.phone}`,
        `<b>Telegram:</b> ${d.telegram}`,
        `<b>Дата рождения:</b> ${d.birthDate}`,
        `<b>Email:</b> ${d.email}`,
        `<b>Город:</b> ${d.city}`,
        `<b>Номинация:</b> ${d.nomination}`,
      ].join('\n')
      break
    }
    case 'duet': {
      const d = data as DuetFormData
      fields = [
        `<b>Название дуэта:</b> ${d.duetName || 'не указано'}`,
        `<b>Email:</b> ${d.email}`,
        `<b>Город:</b> ${d.city}`,
        `<b>Номинация:</b> ${d.nomination}`,
        '',
        `<b>Участник 1:</b>`,
        `  ФИО: ${d.fullName1}`,
        `  Д.р.: ${d.birthDate1}`,
        `  Тел: ${d.phone1}`,
        `  ТГ: ${d.telegram1}`,
        '',
        `<b>Участник 2:</b>`,
        `  ФИО: ${d.fullName2}`,
        `  Д.р.: ${d.birthDate2}`,
        `  Тел: ${d.phone2}`,
        `  ТГ: ${d.telegram2}`,
      ].join('\n')
      break
    }
    case 'team': {
      const d = data as TeamFormData
      fields = [
        `<b>Команда:</b> ${d.teamName}`,
        `<b>Руководитель:</b> ${d.leaderName}`,
        `<b>Тел. рук.:</b> ${d.leaderPhone}`,
        `<b>ТГ рук.:</b> ${d.leaderTelegram}`,
        `<b>Email:</b> ${d.email}`,
        `<b>Город:</b> ${d.city}`,
        `<b>Номинация:</b> ${d.nomination}`,
        `<b>Кол-во участников:</b> ${d.participantsCount}`,
        `<b>Участники:</b>`,
        d.participantsDetails,
      ].join('\n')
      break
    }
    case 'masterclass': {
      const d = data as MasterclassFormData
      fields = [
        `<b>ФИО:</b> ${d.fullName}`,
        `<b>Телефон:</b> ${d.phone}`,
        `<b>Telegram:</b> ${d.telegram}`,
        `<b>Город:</b> ${d.city}`,
        `<b>Классы:</b> ${d.selectedClasses}`,
      ].join('\n')
      break
    }
    case 'spectator': {
      const d = data as SpectatorFormData
      fields = [
        `<b>ФИО:</b> ${d.fullName}`,
        `<b>Телефон:</b> ${d.phone}`,
        `<b>Telegram:</b> ${d.telegram}`,
        `<b>Город:</b> ${d.city}`,
        `<b>Билет:</b> ${d.ticketType}`,
      ].join('\n')
      break
    }
  }

  return title + fields + '\n\nЕсли данные верны, нажмите кнопку «Подтвердить» ниже.'
}

export function getInstructionText(category: FormCategory): string {
  const instructions: Record<FormCategory, string> = {
    solo: '✅ Заявка подтверждена!\n\nОжидайте связи с менеджером в течение 24 часов для оплаты и дальнейших инструкций.',
    duet: '✅ Заявка подтверждена!\n\nОжидайте связи с менеджером в течение 24 часов для оплаты и дальнейших инструкций.',
    team: '✅ Заявка подтверждена!\n\nОжидайте связи с менеджером в течение 24 часов для оплаты и дальнейших инструкций.',
    masterclass: '✅ Заявка на мастер-классы подтверждена!\n\nОжидайте связи с менеджером в течение 24 часов для оплаты и получения дополнительной информации.',
    spectator: '✅ Заявка на зрительский билет подтверждена!\n\nОжидайте связи с менеджером в течение 24 часов для оплаты и получения билета.',
  }
  return instructions[category]
}

export function formatAdminNotification(category: FormCategory, data: FormData): string {
  let name = ''
  switch (category) {
    case 'solo': name = (data as SoloFormData).fullName; break
    case 'duet': name = (data as DuetFormData).duetName || (data as DuetFormData).fullName1; break
    case 'team': name = (data as TeamFormData).teamName; break
    case 'masterclass': name = (data as MasterclassFormData).fullName; break
    case 'spectator': name = (data as SpectatorFormData).fullName; break
  }
  return `🆕 Новая подтверждённая заявка!\n\n<b>Категория:</b> ${CATEGORY_NAMES[category]}\n<b>Имя/Название:</b> ${name}\n\nДанные записаны в таблицу.`
}
