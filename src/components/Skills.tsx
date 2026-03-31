import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { skills } from '../data/portfolio'

const categories = ['All', 'Language', 'Frontend', 'Backend', 'Tools']

const categoryColors: Record<string, string> = {
  Language: 'from-violet-500 to-purple-600',
  Frontend: 'from-cyan-500 to-blue-600',
  Backend: 'from-emerald-500 to-green-600',
  Tools: 'from-orange-500 to-amber-500',
}

const categoryIcons: Record<string, string> = {
  Language: '{ }',
  Frontend: '◈',
  Backend: '⚙',
  Tools: '⊞',
}

function SkillBar({ name, level, category, visible }: {
  name: string
  level: number
  category: string
  visible: boolean
}) {
  const { isDark } = useTheme()
  const gradient = categoryColors[category] || 'from-orange-500 to-amber-500'

  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${isDark
      ? 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15'
      : 'bg-black/3 border-black/10 hover:bg-black/5 hover:border-black/15'
      }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono px-2 py-0.5 rounded bg-linear-to-r ${gradient} text-white font-bold`}>
            {skills.find(s => s.name === name)?.icon || '◦'}
          </span>
          <span className={`font-semibold text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
            {name}
          </span>
        </div>
        <span className={`text-xs font-mono font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          {level}%
        </span>
      </div>

      <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
        <div
          className={`h-full rounded-full bg-linear-to-r ${gradient} transition-all duration-1000 ease-out`}
          style={{
            width: visible ? `${level}%` : '0%',
          }}
        />
      </div>
    </div>
  )
}

function SectionHeader({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  const { isDark } = useTheme()
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20">
        ◈ skills
      </div>
      <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'
        }`}>
        {children}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default function Skills() {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState('All')
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

  const filtered = skills.filter(
    s => activeCategory === 'All' || s.category === activeCategory
  )

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-amber-500' : 'bg-amber-400'
          }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader subtitle="Technologies and tools I work with regularly, organized by proficiency.">
          My Tech Stack
        </SectionHeader>

        {/* Category overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(categoryIcons).map(([cat, icon]) => {
            const count = skills.filter(s => s.category === cat).length
            const avgLevel = Math.round(
              skills.filter(s => s.category === cat).reduce((a, s) => a + s.level, 0) /
              skills.filter(s => s.category === cat).length
            )
            const gradient = categoryColors[cat]

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-200 hover:scale-105 overflow-hidden ${activeCategory === cat
                  ? isDark
                    ? 'border-orange-500/40 bg-orange-500/10'
                    : 'border-orange-500/40 bg-orange-500/5'
                  : isDark
                    ? 'border-white/10 bg-white/5 hover:border-white/20'
                    : 'border-black/10 bg-black/3 hover:border-black/20'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white text-lg mb-3 shadow-lg`}>
                  {icon}
                </div>
                <div className={`font-semibold text-sm mb-1 ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  {cat}
                </div>
                <div className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {count} skills · {avgLevel}% avg
                </div>
                {activeCategory === cat && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap gap-2 mb-8 p-1.5 rounded-xl w-fit mx-auto ${isDark ? 'bg-white/5' : 'bg-black/5'
          }`}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat
                ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                : isDark
                  ? 'text-zinc-400 hover:text-zinc-200'
                  : 'text-zinc-600 hover:text-zinc-900'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              style={{ animationDelay: `${i * 0.05}s` }}
              className={visible ? 'fade-in-up' : 'opacity-0'}
            >
              <SkillBar
                name={skill.name}
                level={skill.level}
                category={skill.category}
                visible={visible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
