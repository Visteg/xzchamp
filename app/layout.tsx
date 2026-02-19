import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proexzchamp.ru'

export const metadata: Metadata = {
  title: 'PRO_E_XZ CHAMP — Танцевальный чемпионат в Ростове-на-Дону',
  description: 'PRO_E_XZ CHAMP — танцевальный чемпионат и мастер-классы в Ростове-на-Дону, 22–24 мая 2026. Соревнования по hip-hop, afro, contemporary, high heels и strip с участием топ-хореографов страны.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PRO_E_XZ CHAMP — Танцевальный чемпионат',
    description: 'Танцевальный чемпионат и мастер-классы. 22–24 мая 2026, Ростов-на-Дону. Регистрация открыта!',
    url: '/',
    siteName: 'PRO_E_XZ CHAMP',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/proexz лого.png',
        width: 1200,
        height: 630,
        alt: 'PRO_E_XZ CHAMP — Танцевальный чемпионат',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRO_E_XZ CHAMP — Танцевальный чемпионат',
    description: 'Танцевальный чемпионат и мастер-классы. 22–24 мая 2026, Ростов-на-Дону.',
    images: ['/proexz лого.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'PRO_E_XZ',
        url: siteUrl,
        logo: `${siteUrl}/proexz лого.png`,
        sameAs: [
          'https://www.instagram.com/pro_e_xz',
          'https://vk.ru/proexz_events',
          'https://t.me/pro_e_xz',
        ],
      },
      {
        '@type': 'DanceEvent',
        name: 'PRO_E_XZ CHAMP & CLASSES',
        description: 'Танцевальный чемпионат и мастер-классы по направлениям: hip-hop, afro, contemporary, high heels, strip.',
        startDate: '2026-05-22',
        endDate: '2026-05-24',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Концертный зал «Пересвет Арена»',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Целиноградская ул., 3',
            addressLocality: 'Ростов-на-Дону',
            addressCountry: 'RU',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'PRO_E_XZ',
          url: siteUrl,
        },
        image: `${siteUrl}/proexz лого.png`,
        url: siteUrl,
        inLanguage: 'ru',
        offers: [
          {
            '@type': 'Offer',
            name: 'Зрительский билет',
            price: '800',
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-02-09',
          },
          {
            '@type': 'Offer',
            name: 'Участие Solo',
            price: '1900',
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-02-09',
          },
        ],
      },
    ],
  }

  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106881049', 'ym');

              ym(106881049, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/106881049" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  )
}
