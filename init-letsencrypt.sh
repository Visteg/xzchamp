#!/bin/bash

# Скрипт для первоначальной настройки SSL сертификатов Let's Encrypt
# Запускать один раз при первом деплое

domains=(proexzchamp.ru www.proexzchamp.ru)
email=""  # Укажите ваш email для уведомлений (опционально)
staging=0  # Поставьте 1 для тестирования (без лимитов), 0 для production

data_path="./certbot"
rsa_key_size=4096

# Проверяем наличие docker compose
if ! [ -x "$(command -v docker)" ]; then
  echo "Ошибка: Docker не установлен." >&2
  exit 1
fi

# Создаём директории
mkdir -p "$data_path/conf"
mkdir -p "$data_path/www"

# Скачиваем рекомендованные параметры TLS
if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Скачиваем рекомендованные TLS параметры ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

# Создаём временный самоподписанный сертификат
echo "### Создаём временный сертификат для ${domains[0]} ..."
path="/etc/letsencrypt/live/${domains[0]}"
mkdir -p "$data_path/conf/live/${domains[0]}"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo

# Запускаем nginx с временным сертификатом
echo "### Запускаем nginx ..."
docker compose up --force-recreate -d nginx
echo

# Удаляем временный сертификат
echo "### Удаляем временный сертификат ..."
docker compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${domains[0]} && \
  rm -Rf /etc/letsencrypt/archive/${domains[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${domains[0]}.conf" certbot
echo

# Формируем аргументы для certbot
echo "### Запрашиваем сертификат Let's Encrypt ..."

# Формируем список доменов
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Выбираем staging или production
if [ $staging != "0" ]; then
  staging_arg="--staging"
else
  staging_arg=""
fi

# Email аргумент
if [ -z "$email" ]; then
  email_arg="--register-unsafely-without-email"
else
  email_arg="--email $email"
fi

# Запрашиваем сертификат
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

# Перезапускаем nginx с настоящим сертификатом
echo "### Перезапускаем nginx ..."
docker compose exec nginx nginx -s reload

echo ""
echo "==================================="
echo "  SSL сертификат успешно получен!"
echo "  Сайт доступен по адресу:"
echo "  https://proexzchamp.ru"
echo "==================================="
