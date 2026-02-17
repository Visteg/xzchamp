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

const NOMINATION_LABELS: Record<string, string> = {
  // Solo
  'babies-star-solo': 'Babies star solo',
  'kids-contemporary-beg-solo': 'Kids contemporary lvl BEG solo',
  'kids-contemporary-pro-solo': 'Kids contemporary lvl PRO solo',
  'kids-street-beg-solo': 'Kids street lvl BEG solo',
  'kids-street-pro-solo': 'Kids street lvl PRO solo',
  'teens-contemporary-beg-solo': 'Teens contemporary lvl BEG solo',
  'teens-contemporary-pro-solo': 'Teens contemporary lvl PRO solo',
  'teens-street-beg-solo': 'Teens street lvl BEG solo',
  'teens-street-pro-solo': 'Teens street lvl PRO solo',
  'teens-afro-fusion-solo': 'Teens afro fusion solo',
  'adults-contemporary-beg-solo': 'Adults contemporary lvl BEG solo',
  'adults-contemporary-pro-solo': 'Adults contemporary lvl PRO solo',
  'adults-afro-fusion-solo': 'Adults afro fusion solo',
  'adults-street-beg-solo': 'Adults street lvl BEG solo',
  'adults-street-pro-solo': 'Adults street lvl PRO solo',
  'ladies-heels-beg-solo': 'Ladies heels lvl BEG solo',
  'ladies-heels-pro-solo': 'Ladies heels lvl PRO solo',
  'ladies-strip-beg-solo': 'Ladies strip lvl BEG solo',
  'ladies-strip-pro-solo': 'Ladies strip lvl PRO solo',
  // Duet
  'babies-star-duo': 'Babies star duo',
  'kids-duo': 'Kids duo',
  'teens-beg-duo': 'Teens lvl BEG duo',
  'teens-pro-duo': 'Teens lvl PRO duo',
  'adults-contemporary-beg-duo': 'Adults contemporary lvl BEG duo',
  'adults-contemporary-pro-duo': 'Adults contemporary lvl PRO duo',
  'adults-street-beg-duo': 'Adults street lvl BEG duo',
  'adults-street-pro-duo': 'Adults street lvl PRO duo',
  'ladies-beg-duo': 'Ladies lvl BEG duo',
  'ladies-pro-duo': 'Ladies lvl PRO duo',
  // Team
  'babies-star-crew': 'Babies star crew',
  'kids-contemporary-crew': 'Kids contemporary crew',
  'kids-street-crew': 'Kids street crew',
  'teens-contemporary-beg-crew': 'Teens contemporary lvl BEG crew',
  'teens-contemporary-pro-crew': 'Teens contemporary lvl PRO crew',
  'teens-street-beg-crew': 'Teens street lvl BEG crew',
  'teens-street-pro-crew': 'Teens street lvl PRO crew',
  'adults-contemporary-beg-crew': 'Adults contemporary lvl BEG crew',
  'adults-contemporary-pro-crew': 'Adults contemporary lvl PRO crew',
  'adults-street-beg-crew': 'Adults street lvl BEG crew',
  'adults-street-pro-crew': 'Adults street lvl PRO crew',
  'ladies-beg-crew': 'Ladies lvl BEG crew',
  'ladies-pro-crew': 'Ladies lvl PRO crew',
  // Masterclass
  'full-pass': 'Full pass',
  'street-block': 'Street block',
  'ladies-block': 'Ladies block',
  'hip-hop': 'Hip-Hop',
  'breaking': 'Breaking',
  'popping': 'Popping',
  'locking': 'Locking',
  'house': 'House',
  'dancehall': 'Dancehall',
  'contemporary': 'Contemporary',
  // Spectator
  'standard': 'Стандартный',
  'vip': 'VIP',
  'all-days': 'Все дни',
}

export function label(value: string): string {
  return NOMINATION_LABELS[value] || value
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
        `<b>Номинация:</b> ${label(d.nomination)}`,
      ].join('\n')
      break
    }
    case 'duet': {
      const d = data as DuetFormData
      fields = [
        `<b>Название дуэта:</b> ${d.duetName || 'не указано'}`,
        `<b>Email:</b> ${d.email}`,
        `<b>Город:</b> ${d.city}`,
        `<b>Номинация:</b> ${label(d.nomination)}`,
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
        `<b>Номинация:</b> ${label(d.nomination)}`,
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
        `<b>Классы:</b> ${label(d.selectedClasses)}`,
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
        `<b>Билет:</b> ${label(d.ticketType)}`,
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

const CATEGORY_EMOJI: Record<FormCategory, string> = {
  solo: '💃',
  duet: '👫',
  team: '👥',
  masterclass: '🎓',
  spectator: '🎟',
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
  const emoji = CATEGORY_EMOJI[category]
  return `${emoji} <b>${CATEGORY_NAMES[category]}</b> — новая заявка\n\n<b>Имя/Название:</b> ${name}\n\n✅ Данные записаны в таблицу.`
}
