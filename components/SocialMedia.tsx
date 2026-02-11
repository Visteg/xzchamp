'use client'

interface SocialLink {
  name: string
  icon: JSX.Element
  url: string
}

export default function SocialMedia() {
  const socials: SocialLink[] = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/pro_e_xz?igsh=MTRtY2RrajFpeXZucg=',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'VK',
      url: 'https://vk.ru/proexz_events',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.39 14.31h-1.37c-.61 0-.79-.49-1.88-1.58-.95-.94-1.36-1.07-1.6-1.07-.33 0-.42.09-.42.53v1.44c0 .39-.13.62-1.13.62-1.67 0-3.52-.99-4.82-2.84-1.97-2.75-2.51-4.81-2.51-5.23 0-.24.09-.46.53-.46h1.37c.4 0 .55.18.7.6.77 2.14 2.07 4.02 2.6 4.02.2 0 .29-.09.29-.59v-2.31c-.06-1.06-.62-1.15-.62-1.53 0-.19.16-.38.42-.38h2.15c.34 0 .46.18.46.58v3.12c0 .34.15.46.25.46.2 0 .36-.12.73-.49 1.12-1.25 1.92-3.19 1.92-3.19.1-.23.29-.46.73-.46h1.37c.41 0 .5.21.41.58-.17.81-1.91 3.69-1.91 3.69-.16.27-.23.39 0 .69.17.23.73.71 1.1 1.14.67.77 1.19 1.41 1.33 1.86.13.45-.08.67-.52.67z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      url: 'https://t.me/pro_e_xz',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      )
    }
  ]

  return (
    <section id="social" className="py-16 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-['Unbounded'] text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="chrome-text">Соцсети</span>
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--neon-blue)] hover:shadow-[0_0_20px_var(--neon-blue)] group-hover:scale-110">
                <div className="text-gray-400 group-hover:text-[var(--neon-blue)] transition-colors duration-300">
                  {social.icon}
                </div>
              </div>
              <span className="text-xs text-gray-400 group-hover:text-[var(--neon-blue)] transition-colors duration-300">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
