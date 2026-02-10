'use client'

export default function Memories() {
  return (
    <section id="memories" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-['Unbounded'] text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="chrome-text">Воспоминания</span>
        </h2>

        <div className="space-y-4">
          {/* Main large image */}
          <div className="relative group">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 flex items-center justify-center aspect-video border border-white/10 hover:border-[var(--neon-pink)]/30 transition-all duration-300">
              <div className="text-center text-gray-500">
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-xl flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Two smaller images in a row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center aspect-square border border-white/10 hover:border-[var(--neon-blue)]/30 transition-all duration-300">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 mx-auto bg-white/5 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center aspect-square border border-white/10 hover:border-[var(--neon-blue)]/30 transition-all duration-300">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 mx-auto bg-white/5 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
