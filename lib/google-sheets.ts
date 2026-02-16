import { google } from 'googleapis'
import {
  FormCategory,
  FormData,
  SoloFormData,
  DuetFormData,
  TeamFormData,
  MasterclassFormData,
  SpectatorFormData,
} from './types'
import { label } from './telegram-messages'

const SHEET_NAMES: Record<FormCategory, string> = {
  solo: 'Соло',
  duet: 'Дуэт',
  team: 'Команда',
  masterclass: 'Мастерклассы',
  spectator: 'Зрители',
}

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const moscow = new Date(d.getTime() + 3 * 60 * 60 * 1000)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(moscow.getUTCDate())}.${pad(moscow.getUTCMonth() + 1)}.${moscow.getUTCFullYear()} ${pad(moscow.getUTCHours())}:${pad(moscow.getUTCMinutes())}`
}

function buildRow(category: FormCategory, data: FormData, timestamp: string): string[] {
  const ts = formatDate(timestamp)
  switch (category) {
    case 'solo': {
      const d = data as SoloFormData
      return [ts, d.fullName, d.phone, d.telegram, d.birthDate, d.email, d.city, label(d.nomination)]
    }
    case 'duet': {
      const d = data as DuetFormData
      return [ts, d.duetName, d.email, d.city, label(d.nomination), d.fullName1, d.birthDate1, d.phone1, d.telegram1, d.fullName2, d.birthDate2, d.phone2, d.telegram2]
    }
    case 'team': {
      const d = data as TeamFormData
      return [ts, d.teamName, d.leaderName, d.leaderPhone, d.leaderTelegram, d.email, d.city, label(d.nomination), d.participantsCount, d.participantsDetails]
    }
    case 'masterclass': {
      const d = data as MasterclassFormData
      return [ts, d.fullName, d.phone, d.telegram, d.city, label(d.selectedClasses)]
    }
    case 'spectator': {
      const d = data as SpectatorFormData
      return [ts, d.fullName, d.phone, d.telegram, d.city, label(d.ticketType)]
    }
  }
}

export async function appendToSheet(category: FormCategory, data: FormData, timestamp: string): Promise<void> {
  const sheets = await getSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID!
  const sheetName = SHEET_NAMES[category]
  const row = buildRow(category, data, timestamp)

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  })
}
