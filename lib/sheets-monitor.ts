import { google } from 'googleapis'
import { sendMessage } from './telegram'

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // 1 hour
let lastAlertSent = 0
const ALERT_COOLDOWN_MS = 60 * 60 * 1000 // don't spam: 1 alert per hour max

async function checkSheetsHealth(): Promise<{ ok: boolean; error?: string }> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!

    // lightweight read: just fetch spreadsheet metadata
    await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'properties.title',
    })

    return { ok: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: message }
  }
}

async function sendAlert(error: string) {
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID
  if (!adminChatId) return

  const now = Date.now()
  if (now - lastAlertSent < ALERT_COOLDOWN_MS) return

  const text =
    `⚠️ <b>АЛЕРТ: Google Sheets недоступен!</b>\n\n` +
    `Форма записи может не работать.\n` +
    `Ошибка: <code>${escapeHtml(error)}</code>\n\n` +
    `Проверьте доступ сервисного аккаунта к таблице.`

  try {
    await sendMessage({ chat_id: adminChatId, text, parse_mode: 'HTML' })
    lastAlertSent = now
    console.log('[monitor] Alert sent to Telegram')
  } catch (tgErr) {
    console.error('[monitor] Failed to send Telegram alert:', tgErr)
  }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function startSheetsMonitor() {
  console.log('[monitor] Sheets health monitor started (interval: 1h)')

  // run first check after 30 seconds (let the app fully start)
  setTimeout(() => runCheck(), 30_000)

  setInterval(() => runCheck(), CHECK_INTERVAL_MS)
}

async function runCheck() {
  const result = await checkSheetsHealth()

  if (result.ok) {
    console.log(`[monitor] Sheets health OK — ${new Date().toISOString()}`)
  } else {
    console.error(`[monitor] Sheets health FAIL — ${result.error}`)
    await sendAlert(result.error!)
  }
}
