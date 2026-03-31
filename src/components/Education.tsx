import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Award } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { education } from '../data/portfolio'

const typeConfig: Record<string, { color: string; label: string }> = {
  degree: { color: 'bg-violet-500/10 text-violet-400 border-violet-500/20', label: 'Degree' },
  certification: { color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', label: 'Certification' },
}

export default function Education() {
  const { isDark } = useTheme()
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
    <section ref={sectionRef} id="education" className="relative py-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20">
            ◈ education
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'
            }`}>
            Education & Training
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {education.map((edu, i) => {
            const config = typeConfig[edu.type] || typeConfig.degree
            const Icon = edu.type === 'degree' ? GraduationCap : Award

            return (
              <div
                key={i}
                className={`glass rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${visible ? 'fade-in-up' : 'opacity-0'
                  } ${isDark
                    ? 'bg-white/5 border-white/10 hover:border-white/20'
                    : 'bg-black/3 border-black/10 hover:border-black/20'
                  }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${edu.type === 'degree'
                      ? 'bg-violet-500/10'
                      : 'bg-orange-500/10'
                    }`}>
                    <Icon size={20} className={
                      edu.type === 'degree' ? 'text-violet-400' : 'text-orange-400'
                    } />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <h3 className={`font-bold text-base leading-snug mb-0.5 ${isDark ? 'text-white' : 'text-zinc-900'
                      }`}>
                      {edu.degree}
                    </h3>
                    <p className={`font-medium text-sm mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'
                      }`}>
                      {edu.institution}
                    </p>
                    <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}>
                      <span>{edu.period}</span>
                      <span>·</span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
