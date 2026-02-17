import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { addPending, cleanupExpired } from '@/lib/pending-store'
import { getDeepLink, sendMessage } from '@/lib/telegram'
import { appendToSheet } from '@/lib/google-sheets'
import { formatAdminNotification } from '@/lib/telegram-messages'
import { FormCategory, PendingApplication } from '@/lib/types'
import { checkRateLimit } from '@/lib/rate-limiter'
import { validateFormData } from '@/lib/form-validator'

const VALID_CATEGORIES: FormCategory[] = ['solo', 'duet', 'team', 'masterclass', 'spectator']

const CATEGORY_FIELDS: Record<FormCategory, string[]> = {
  solo: ['fullName', 'phone', 'telegram', 'birthDate', 'email', 'city', 'nomination'],
  duet: ['duetName', 'email', 'city', 'nomination', 'fullName1', 'birthDate1', 'phone1', 'telegram1', 'fullName2', 'birthDate2', 'phone2', 'telegram2'],
  team: ['teamName', 'leaderName', 'leaderPhone', 'leaderTelegram', 'email', 'city', 'nomination', 'participantsCount', 'participantsDetails'],
  masterclass: ['fullName', 'phone', 'telegram', 'city', 'selectedClasses'],
  spectator: ['fullName', 'phone', 'telegram', 'city', 'ticketType'],
}

export async function POST(req: NextRequest) {
  try {
    cleanupExpired()

    // 1. Rate limiting by IP
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown'

    const rateResult = checkRateLimit(ip)
    if (!rateResult.allowed) {
      return NextResponse.json(
        { error: 'Слишком много запросов. Попробуйте через несколько минут.' },
        { status: 429, headers: { 'Retry-After': String(rateResult.retryAfterSeconds || 60) } }
      )
    }

    const body = await req.json()
    const { category, formData } = body as { category: FormCategory; formData: Record<string, unknown> }

    // 2. Category validation
    if (!category || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    if (!formData || typeof formData !== 'object') {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 })
    }

    // 3. Field content validation
    const validation = validateFormData(category, formData)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0], errors: validation.errors },
        { status: 400 }
      )
    }

    // 4. Keep only relevant fields for this category
    const allowedFields = CATEGORY_FIELDS[category]
    const cleanData: Record<string, unknown> = {}
    for (const field of allowedFields) {
      if (formData[field] !== undefined) {
        cleanData[field] = formData[field]
      }
    }

    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    const pending: PendingApplication = {
      id,
      category,
      data: cleanData as unknown as PendingApplication['data'],
      createdAt,
      confirmed: false,
    }

    // 5. Write to Google Sheets immediately
    try {
      await appendToSheet(category, pending.data, createdAt)
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError)
      return NextResponse.json({ error: 'Ошибка записи данных. Попробуйте позже.' }, { status: 500 })
    }

    // 6. Save pending (for Telegram bot confirmation flow)
    addPending(pending)

    // 7. Notify admin group
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID
    if (adminChatId) {
      try {
        const adminText = formatAdminNotification(category, pending.data)
        await sendMessage({ chat_id: adminChatId, text: adminText, parse_mode: 'HTML' })
      } catch (adminError) {
        console.error('Admin notification failed:', adminError)
      }
    }

    const telegramLink = getDeepLink(id)

    return NextResponse.json({ success: true, telegramLink, id })
  } catch (error) {
    console.error('Submit form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
