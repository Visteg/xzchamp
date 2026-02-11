/** @type {import('next').NextConfig} */
const nextConfig = {
  // Для VDS используем standalone output для оптимизации
  output: 'standalone',

  // На VDS не нужен basePath
  // basePath убран

  images: {
    // Можно включить оптимизацию изображений на VDS
    unoptimized: false,
    // Настройки для оптимизации
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Дополнительные настройки для production
  compress: true,
  poweredByHeader: false,

  // Если нужны переменные окружения
  // env: {
  //   CUSTOM_VAR: process.env.CUSTOM_VAR,
  // },
}

module.exports = nextConfig
