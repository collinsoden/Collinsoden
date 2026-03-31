import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Star, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './icons'
import { useTheme } from '../contexts/ThemeContext'
import { projects } from '../data/portfolio'

const categoryColors: Record<string, string> = {
  'Full Stack': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Open Source': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Template': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Library': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

function ProjectCard({ project, featured, index, visible }: {
  project: typeof projects[0]
  featured: boolean
  index: number
  visible: boolean
}) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${visible ? 'fade-in-up' : 'opacity-0'} ${featured ? 'md:col-span-2 lg:col-span-1' : ''
        }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`relative h-full glass rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer group ${hovered
            ? isDark
              ? 'border-orange-500/40 shadow-2xl shadow-orange-500/10 scale-[1.02]'
              : 'border-orange-500/30 shadow-2xl shadow-orange-500/5 scale-[1.02]'
            : isDark
              ? 'border-white/10 bg-white/5'
              : 'border-black/10 bg-black/3'
          }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-linear-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Shimmer on hover */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.3) 0%, transparent 50%, rgba(245,158,11,0.2) 100%)',
              }}
            />
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {featured && (
                  <span className="flex items-center gap-1 text-xs font-medium text-orange-400">
                    <Star size={11} fill="currentColor" />
                    Featured
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[project.category] || categoryColors['Full Stack']
                  }`}>
                  {project.category}
                </span>
              </div>

              <h3 className={`text-xl font-bold mb-1 group-hover:text-orange-400 transition-colors ${isDark ? 'text-white' : 'text-zinc-900'
                }`}>
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 ml-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isDark
                      ? 'text-zinc-500 hover:text-white hover:bg-white/10'
                      : 'text-zinc-400 hover:text-zinc-900 hover:bg-black/10'
                    }`}
                  aria-label="GitHub"
                >
                  <GithubIcon size={17} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isDark
                      ? 'text-zinc-500 hover:text-orange-400 hover:bg-orange-500/10'
                      : 'text-zinc-400 hover:text-orange-600 hover:bg-orange-500/10'
                    }`}
                  aria-label="Live demo"
                >
                  <ExternalLink size={17} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.metrics.map(m => (
              <span
                key={m}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium ${isDark
                    ? 'bg-white/8 text-zinc-300 border border-white/10'
                    : 'bg-black/5 text-zinc-700 border border-black/10'
                  }`}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map(t => (
              <span
                key={t}
                className={`text-xs px-2 py-0.5 rounded font-mono ${isDark
                    ? 'text-orange-400/80 bg-orange-500/10'
                    : 'text-orange-600/80 bg-orange-500/10'
                  }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* View project link */}
          <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-200 ${hovered
              ? 'text-orange-400 translate-x-1'
              : isDark ? 'text-zinc-600' : 'text-zinc-400'
            }`}>
            View project
            <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { isDark } = useTheme()
  const [filter, setFilter] = useState('All')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const allCategories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

  const filtered = projects.filter(
    p => filter === 'All' || p.category === filter
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-amber-500' : 'bg-amber-400'
          }`} />
        <div className={`absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-8 ${isDark ? 'bg-orange-600' : 'bg-orange-300'
          }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20">
            ◈ projects
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'
            }`}>
            Things I've Built
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            A selection of projects that showcase my range, from full-stack platforms to open source tools.
          </p>
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap gap-2 mb-10 p-1.5 rounded-xl w-fit mx-auto ${isDark ? 'bg-white/5' : 'bg-black/5'
          }`}>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${filter === cat
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

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={project.featured}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 fade-in-up ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-sm mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Want to see more?
          </p>
          <a
            href="https://github.com/collinsoden"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
                ? 'border-white/15 text-zinc-300 hover:bg-white/8 hover:border-white/25'
                : 'border-black/15 text-zinc-700 hover:bg-black/5 hover:border-black/25'
              }`}
          >
            <GithubIcon size={16} />
            View all on GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
