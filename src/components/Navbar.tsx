import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { personalInfo } from '../data/portfolio'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? isDark
            ? 'glass bg-zinc-950/70 border-b border-white/6 shadow-xl shadow-black/20'
            : 'glass bg-white/70 border-b border-black/6 shadow-xl shadow-black/5'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <img
                src="/brand-mark.svg"
                alt={`${personalInfo.name} logo`}
                className="w-9 h-9 rounded-xl shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:flex sm:flex-col sm:items-start sm:leading-none">
                <span className={`font-semibold text-sm transition-colors ${isDark ? 'text-zinc-200' : 'text-zinc-800'
                  }`}>
                  {personalInfo.name}
                </span>
                <span className={`${isDark ? 'text-zinc-500' : 'text-zinc-500'} text-[11px] tracking-[0.24em] uppercase`}>
                  Software Engineer
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = activeSection === href.slice(1)
                return (
                  <button
                    key={href}
                    onClick={() => handleNav(href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                      ? 'text-orange-500'
                      : isDark
                        ? 'text-zinc-400 hover:text-zinc-100'
                        : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${isDark
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-white/10'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/10'
                  }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a
                href={personalInfo.resume}
                className="hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Resume
              </a>

              <button
                onClick={() => setMobileOpen(o => !o)}
                className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'
            } ${isDark ? 'bg-black/60' : 'bg-black/30'}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-16 left-4 right-4 rounded-2xl p-4 transition-all duration-300 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            } ${isDark
              ? 'glass bg-zinc-900/90 border border-white/10'
              : 'glass bg-white/90 border border-black/10'
            } shadow-2xl`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isDark
                  ? 'text-zinc-300 hover:text-white hover:bg-white/10'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
                  }`}
              >
                {label}
              </button>
            ))}
            <div className={`my-2 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} />
            <a
              href={personalInfo.resume}
              className="text-center py-3 rounded-xl text-sm font-medium bg-linear-to-r from-orange-500 to-amber-500 text-white"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
