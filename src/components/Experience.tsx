import { useEffect, useRef, useState } from 'react'
import { Briefcase, MapPin, Calendar, ChevronDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { experience } from '../data/portfolio'

const typeColors: Record<string, string> = {
  'full-time': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  freelance: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  contract: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  independent: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

export default function Experience() {
  const { isDark } = useTheme()
  const [expanded, setExpanded] = useState<number | null>(0)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-orange-500' : 'bg-orange-400'
          }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20">
            ◈ experience
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'
            }`}>
            Work History
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A journey through the roles and companies that shaped my expertise.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-6.75 md:left-1/2 top-0 bottom-0 w-px ${isDark ? 'bg-white/10' : 'bg-black/10'
            } md:-translate-x-px`} />

          <div className="space-y-8">
            {experience.map((job, i) => {
              const isExpanded = expanded === i
              const isLeft = i % 2 === 0

              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 md:gap-0 ${visible ? 'fade-in-up' : 'opacity-0'
                    }`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6">
                    <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center shadow-xl transition-all duration-300 ${isExpanded
                        ? 'bg-linear-to-br from-orange-500 to-amber-500 border-orange-400 shadow-orange-500/30 scale-110'
                        : isDark
                          ? 'bg-zinc-900 border-white/20'
                          : 'bg-white border-black/20'
                      }`}>
                      <Briefcase
                        size={20}
                        className={isExpanded ? 'text-white' : isDark ? 'text-zinc-400' : 'text-zinc-500'}
                      />
                    </div>
                  </div>

                  {/* Card — alternates sides on desktop */}
                  <div className={`w-full md:w-[calc(50%-48px)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    } pl-2 md:pl-0`}>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : i)}
                      className={`w-full text-left glass rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.01] ${isExpanded
                          ? isDark
                            ? 'bg-white/8 border-orange-500/30 shadow-xl shadow-orange-500/10'
                            : 'bg-orange-500/5 border-orange-500/30 shadow-xl shadow-orange-500/10'
                          : isDark
                            ? 'bg-white/5 border-white/10 hover:border-white/20'
                            : 'bg-black/3 border-black/10 hover:border-black/20'
                        }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-zinc-900'
                              }`}>
                              {job.role}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[job.type] || typeColors['full-time']
                              }`}>
                              {job.type}
                            </span>
                          </div>
                          <div className={`font-semibold text-base ${isDark ? 'text-orange-400' : 'text-orange-600'
                            }`}>
                            {job.company}
                          </div>
                        </div>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-orange-400' : isDark ? 'text-zinc-500' : 'text-zinc-400'
                            }`}
                        />
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'
                          }`}>
                          <Calendar size={13} />
                          {job.period}
                        </div>
                        <div className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'
                          }`}>
                          <MapPin size={13} />
                          {job.location}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {job.description}
                      </p>

                      {/* Expandable content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-125 mt-5 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                      >
                        {/* Highlights */}
                        <div className="mb-5">
                          <h4 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-zinc-500' : 'text-zinc-500'
                            }`}>
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {job.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                                <span className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                  {h}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech stack */}
                        <div>
                          <h4 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-zinc-500' : 'text-zinc-500'
                            }`}>
                            Tech Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.tech.map(t => (
                              <span
                                key={t}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${isDark
                                    ? 'bg-white/8 text-zinc-300 border border-white/10'
                                    : 'bg-black/5 text-zinc-700 border border-black/10'
                                  }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
