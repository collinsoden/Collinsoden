import { useEffect, useRef, useState } from 'react'
import { ArrowDown, MapPin, Handshake } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from './icons'
import { useTheme } from '../contexts/ThemeContext'
import { personalInfo, stats, techBadges } from '../data/portfolio'

const TYPING_STRINGS = [
  'Full Stack Developer',
  'TypeScript Enthusiast',
  'Python Engineer',
  'Open Source Contributor',
  'Problem Solver',
]

function useTypingEffect(strings: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[idx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setIdx(i => (i + 1) % strings.length)
    } else if (deleting) {
      timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), speed / 2)
    } else {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, idx, strings, speed, pause])

  return displayed
}

export default function Hero() {
  const { isDark } = useTheme()
  const typed = useTypingEffect(TYPING_STRINGS)
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`float-slow absolute -top-32 -left-32 w-150 h-150 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-orange-500' : 'bg-orange-400'
            }`}
        />
        <div
          className={`float-medium absolute -bottom-32 -right-32 w-125 h-125 rounded-full blur-3xl opacity-15 ${isDark ? 'bg-amber-500' : 'bg-amber-400'
            }`}
        />
        <div
          className={`float-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full blur-3xl opacity-5 ${isDark ? 'bg-orange-600' : 'bg-orange-300'
            }`}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">

          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 glass border fade-in-up ${isDark
              ? 'bg-white/5 border-white/10 text-zinc-300'
              : 'bg-black/5 border-black/10 text-zinc-700'
              }`}
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 glow-pulse" />
            {personalInfo.availability}
            <Handshake size={14} className="text-orange-400" />
          </div>

          {/* Main heading */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 fade-in-up ${isDark ? 'text-white' : 'text-zinc-900'
              }`}
            style={{ animationDelay: '0.2s' }}
          >
            Hi, I'm{' '}
            <span className="animated-gradient bg-linear-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>

          {/* Typing effect */}
          <div
            className="flex items-center justify-center gap-2 h-12 mb-6 fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span
              className={`text-2xl sm:text-3xl font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
            >
              {typed}
            </span>
            <span className="cursor-blink w-0.5 h-7 bg-orange-500 rounded-full" />
          </div>

          {/* Bio */}
          <p
            className={`max-w-2xl text-lg leading-relaxed mb-8 fade-in-up ${isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            style={{ animationDelay: '0.4s' }}
          >
            {personalInfo.bio}
          </p>

          {/* Location */}
          <div
            className={`flex items-center gap-1.5 text-sm mb-10 fade-in-up ${isDark ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            style={{ animationDelay: '0.5s' }}
          >
            <MapPin size={14} />
            {personalInfo.location}
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 mb-16 fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              View Projects
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
                ? 'border-white/20 text-zinc-300 hover:bg-white/5 hover:border-white/30'
                : 'border-black/20 text-zinc-700 hover:bg-black/5 hover:border-black/30'
                }`}
            >
              Get in Touch
            </button>
          </div>

          {/* Social links */}
          <div
            className="flex items-center gap-4 mb-16 fade-in-up"
            style={{ animationDelay: '0.7s' }}
          >
            {[
              { href: personalInfo.github, icon: GithubIcon, label: 'GitHub' },
              { href: personalInfo.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
              { href: personalInfo.facebook, icon: FacebookIcon, label: 'Facebook' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-3 rounded-xl border transition-all duration-200 hover:scale-110 active:scale-95 ${isDark
                  ? 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10'
                  : 'border-black/10 bg-black/5 text-zinc-600 hover:text-zinc-900 hover:border-black/20 hover:bg-black/10'
                  }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-16 fade-in-up`}
            style={{ animationDelay: '0.8s' }}
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className={`glass rounded-2xl p-5 border text-center transition-all duration-200 hover:scale-105 ${isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/8'
                  : 'bg-black/5 border-black/10 hover:bg-black/8'
                  }`}
              >
                <div className="text-3xl font-bold bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-1">
                  {value}
                </div>
                <div className={`text-xs font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 max-w-3xl fade-in-up"
            style={{ animationDelay: '0.9s' }}
          >
            {techBadges.map(({ name, color }) => (
              <span
                key={name}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border ${color} transition-all duration-200 hover:scale-105`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
