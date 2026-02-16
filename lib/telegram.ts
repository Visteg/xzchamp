const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`

interface SendMessageOptions {
  chat_id: number | string
  text: string
  parse_mode?: 'HTML' | 'MarkdownV2'
  reply_markup?: object
}

export async function sendMessage(options: SendMessageOptions) {
  const res = await fetch(`${BASE_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('Telegram sendMessage error:', err)
    throw new Error(`Telegram API error: ${res.status}`)
  }
  return res.json()
}

export async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  const res = await fetch(`${BASE_URL}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text || '',
    }),
  })
  return res.json()
}

export async function setWebhook(url: string) {
  const res = await fetch(`${BASE_URL}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  return res.json()
}

export function getDeepLink(uniqueId: string): string {
  const botUsername = process.env.TELEGRAM_BOT_USERNAME!
  return `https://t.me/${botUsername}?start=${uniqueId}`
}
