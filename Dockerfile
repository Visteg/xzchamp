# Многоэтапная сборка для оптимизации размера образа

# Этап 1: Установка зависимостей
FROM node:20-alpine AS deps
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

# Этап 2: Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем зависимости с предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Используем production конфигурацию для VDS
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Сборка Next.js приложения
RUN npm run build

# Этап 3: Production образ
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Создаем директорию для данных заявок
RUN mkdir -p /app/data

# Меняем владельца файлов
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
