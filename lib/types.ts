export type FormCategory = 'solo' | 'duet' | 'team' | 'masterclass' | 'spectator'

export interface SoloFormData {
  fullName: string
  phone: string
  telegram: string
  birthDate: string
  email: string
  city: string
  nomination: string
}

export interface DuetFormData {
  duetName: string
  email: string
  city: string
  nomination: string
  fullName1: string
  birthDate1: string
  phone1: string
  telegram1: string
  fullName2: string
  birthDate2: string
  phone2: string
  telegram2: string
}

export interface TeamFormData {
  teamName: string
  leaderName: string
  leaderPhone: string
  leaderTelegram: string
  email: string
  city: string
  nomination: string
  participantsCount: string
  participantsDetails: string
}

export interface MasterclassFormData {
  fullName: string
  phone: string
  telegram: string
  city: string
  selectedClasses: string
}

export interface SpectatorFormData {
  fullName: string
  phone: string
  telegram: string
  city: string
  ticketType: string
}

export type FormData = SoloFormData | DuetFormData | TeamFormData | MasterclassFormData | SpectatorFormData

export interface PendingApplication {
  id: string
  category: FormCategory
  data: FormData
  createdAt: string
  telegramChatId?: number
  confirmed: boolean
}
