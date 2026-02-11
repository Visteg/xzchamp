# Инструкция по развертыванию на VDS

## Подготовка

### 1. Обновление путей к изображениям

Перед развертыванием на VDS нужно убрать `/xzchamp` префикс из путей к изображениям:

**В файле `components/Hero.tsx`:**
```tsx
// Было: src="/xzchamp/proexz загогулина лого.png"
// Стало: src="/proexz загогулина лого.png"
```

**В файле `components/TelegramHelper.tsx`:**
```tsx
// Было: src="/xzchamp/proexz загогулина лого.png"
// Стало: src="/proexz загогулина лого.png"
```

**В файле `components/MasterClasses.tsx`:**
```tsx
// Было: src="/xzchamp/IMG_5531.JPEG"
// Стало: src="/IMG_5531.JPEG"
```

### 2. Переименовать конфигурацию

```bash
# Сохранить текущую конфигурацию для GitHub Pages
mv next.config.js next.config.github.js

# Использовать production конфигурацию
mv next.config.production.js next.config.js
```

## Развертывание на VDS

### Вариант 1: С Nginx (рекомендуется для production)

1. **Подключитесь к VDS по SSH:**
```bash
ssh user@your-server-ip
```

2. **Установите Docker и Docker Compose (если не установлены):**
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo apt install docker-compose -y

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER
```

3. **Клонируйте репозиторий или загрузите файлы:**
```bash
git clone https://github.com/Visteg/xzchamp.git
cd xzchamp
```

4. **Отредактируйте nginx.conf:**
```bash
nano nginx.conf
# Замените "ваш-домен.ru" на ваш домен
```

5. **Запустите приложение:**
```bash
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Проверка статуса
docker-compose ps
```

6. **Настройка SSL (Let's Encrypt):**
```bash
# Установка certbot
sudo apt install certbot

# Получение сертификата
sudo certbot certonly --standalone -d ваш-домен.ru

# Создание папки для сертификатов
mkdir -p ssl
sudo cp /etc/letsencrypt/live/ваш-домен.ru/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/ваш-домен.ru/privkey.pem ssl/

# Раскомментируйте SSL строки в nginx.conf
nano nginx.conf

# Перезапуск
docker-compose restart nginx
```

### Вариант 2: Без Nginx (только Next.js)

Если не нужен Nginx, отредактируйте `docker-compose.yml`:

```yaml
version: '3.8'

services:
  pro2xz:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: pro2xz-app
    restart: unless-stopped
    ports:
      - "80:3000"  # Или "443:3000" для SSL
    environment:
      - NODE_ENV=production
```

Затем запустите:
```bash
docker-compose up -d
```

## Обновление приложения

```bash
# Остановка контейнеров
docker-compose down

# Обновление кода
git pull

# Пересборка и запуск
docker-compose up -d --build

# Очистка старых образов
docker image prune -f
```

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f pro2xz

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Полная очистка (удаление volumes)
docker-compose down -v

# Проверка использования ресурсов
docker stats

# Вход в контейнер
docker exec -it pro2xz-app sh
```

## Мониторинг и обслуживание

### Автоматическое обновление SSL сертификатов

Добавьте в crontab:
```bash
crontab -e

# Добавьте строку:
0 0 1 * * certbot renew --quiet && docker-compose restart nginx
```

### Логирование

Логи находятся в:
```bash
# Docker логи
docker-compose logs

# Nginx логи (внутри контейнера)
docker exec pro2xz-nginx tail -f /var/log/nginx/access.log
docker exec pro2xz-nginx tail -f /var/log/nginx/error.log
```

## Решение проблем

### Порт уже занят
```bash
# Проверить какой процесс использует порт
sudo lsof -i :80
sudo lsof -i :3000

# Остановить процесс
sudo kill -9 <PID>
```

### Недостаточно места
```bash
# Очистка Docker
docker system prune -a
docker volume prune
```

### Проблемы с сетью
```bash
# Пересоздать сеть
docker-compose down
docker network prune
docker-compose up -d
```

## Возврат к GitHub Pages

Если нужно вернуться к деплою на GitHub Pages:

```bash
mv next.config.js next.config.production.js
mv next.config.github.js next.config.js

# Вернуть пути к изображениям с префиксом /xzchamp
```
