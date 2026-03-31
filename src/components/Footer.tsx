import { useTheme } from '../contexts/ThemeContext'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className={`relative py-12 border-t ${isDark ? 'border-white/6' : 'border-black/6'
      }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-shadow">
              {personalInfo.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {personalInfo.name}
            </span>
          </button>

          {/* Year */}
          <p className={`text-sm ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
