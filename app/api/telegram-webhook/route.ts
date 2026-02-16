import { NextRequest, NextResponse } from 'next/server'
import { findPending, updatePending, removePending, cleanupExpired } from '@/lib/pending-store'
import { sendMessage, answerCallbackQuery } from '@/lib/telegram'
import { appendToSheet } from '@/lib/google-sheets'
import { formatApplicationForUser, getInstructionText, formatAdminNotification } from '@/lib/telegram-messages'

export async function POST(req: NextRequest) {
  try {
    cleanupExpired()

    const update = await req.json()

    // Handle /start command with deep link parameter
    if (update.message?.text?.startsWith('/start ')) {
      const chatId = update.message.chat.id
      const uniqueId = update.message.text.split(' ')[1]?.trim()

      if (!uniqueId) {
        await sendMessage({
          chat_id: chatId,
          text: 'Добро пожаловать! Для подачи заявки перейдите на сайт и заполните форму регистрации.',
        })
        return NextResponse.json({ ok: true })
      }

      const pending = findPending(uniqueId)

      if (!pending) {
        await sendMessage({
          chat_id: chatId,
          text: '❌ Заявка не найдена или срок действия истёк. Пожалуйста, заполните форму заново на сайте.',
        })
        return NextResponse.json({ ok: true })
      }

      if (pending.confirmed) {
        await sendMessage({
          chat_id: chatId,
          text: '✅ Эта заявка уже была подтверждена ранее.',
        })
        return NextResponse.json({ ok: true })
      }

      updatePending(uniqueId, { telegramChatId: chatId })

      const text = formatApplicationForUser(pending.category, pending.data)
      await sendMessage({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ Подтвердить', callback_data: `confirm:${uniqueId}` },
            { text: '❌ Отменить', callback_data: `cancel:${uniqueId}` },
          ]],
        },
      })

      return NextResponse.json({ ok: true })
    }

    // Handle bare /start (without deep link)
    if (update.message?.text === '/start') {
      const chatId = update.message.chat.id
      await sendMessage({
        chat_id: chatId,
        text: 'Добро пожаловать! 🎉\n\nДля подачи заявки на чемпионат перейдите на сайт и заполните форму регистрации.',
      })
      return NextResponse.json({ ok: true })
    }

    // Handle callback queries (button presses)
    if (update.callback_query) {
      const callbackQuery = update.callback_query
      const chatId = callbackQuery.message.chat.id
      const data = callbackQuery.data as string

      if (data.startsWith('confirm:')) {
        const uniqueId = data.replace('confirm:', '')
        const pending = findPending(uniqueId)

        if (!pending) {
          await answerCallbackQuery(callbackQuery.id, 'Заявка не найдена')
          return NextResponse.json({ ok: true })
        }

        if (pending.confirmed) {
          await answerCallbackQuery(callbackQuery.id, 'Заявка уже подтверждена')
          return NextResponse.json({ ok: true })
        }

        // 1. Write to Google Sheets
        try {
          await appendToSheet(pending.category, pending.data, pending.createdAt)
        } catch (sheetError) {
          console.error('Google Sheets error:', sheetError)
          await answerCallbackQuery(callbackQuery.id, 'Ошибка записи. Попробуйте позже.')
          return NextResponse.json({ ok: true })
        }

        // 2. Mark as confirmed
        updatePending(uniqueId, { confirmed: true })

        // 3. Send instruction to user
        const instructionText = getInstructionText(pending.category)
        await sendMessage({ chat_id: chatId, text: instructionText })

        // 4. Notify admin group
        const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID
        if (adminChatId) {
          const adminText = formatAdminNotification(pending.category, pending.data)
          await sendMessage({ chat_id: adminChatId, text: adminText, parse_mode: 'HTML' })
        }

        // 5. Answer callback
        await answerCallbackQuery(callbackQuery.id, 'Заявка подтверждена!')

        // 6. Clean up
        removePending(uniqueId)

        return NextResponse.json({ ok: true })
      }

      if (data.startsWith('cancel:')) {
        const uniqueId = data.replace('cancel:', '')
        removePending(uniqueId)
        await sendMessage({
          chat_id: chatId,
          text: '❌ Заявка отменена. Вы можете заполнить форму заново на сайте.',
        })
        await answerCallbackQuery(callbackQuery.id, 'Заявка отменена')
        return NextResponse.json({ ok: true })
      }

      await answerCallbackQuery(callbackQuery.id)
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    // Always return 200 to prevent Telegram retry floods
    return NextResponse.json({ ok: true })
  }
}
