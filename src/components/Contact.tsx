import { useEffect, useRef, useState } from 'react'
import { Mail, Send, MapPin, Copy, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from './icons'
import { useTheme } from '../contexts/ThemeContext'
import { personalInfo } from '../data/portfolio'

const socialLinks = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    handle: '@collinsoden',
    href: personalInfo.github,
    color: 'hover:border-zinc-400/40 hover:bg-zinc-400/5',
    hoverText: 'hover:text-zinc-200',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    handle: 'in/collinsoden',
    href: personalInfo.linkedin,
    color: 'hover:border-blue-400/40 hover:bg-blue-400/5',
    hoverText: 'hover:text-blue-300',
  },
  {
    icon: FacebookIcon,
    label: 'Facebook',
    handle: 'collinsoden',
    href: personalInfo.facebook,
    color: 'hover:border-blue-500/40 hover:bg-blue-500/5',
    hoverText: 'hover:text-blue-400',
  },
]

export default function Contact() {
  const { isDark } = useTheme()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send (replace with your form handler / API)
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  const inputBase = `w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 ${isDark
    ? 'bg-white/5 border-white/10 text-zinc-100 placeholder-zinc-600'
    : 'bg-black/[0.03] border-black/10 text-zinc-900 placeholder-zinc-400'
    }`

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-orange-500' : 'bg-orange-400'
          }`} />
        <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-8 ${isDark ? 'bg-amber-500' : 'bg-amber-400'
          }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20">
            ◈ contact
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'
            }`}>
            Let's Work Together
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Have a project in mind or want to chat? I'm always open to new opportunities and conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — info */}
          <div className={`lg:col-span-2 space-y-6 ${visible ? 'fade-in-up' : 'opacity-0'}`}>
            {/* Email card */}
            <div className={`glass rounded-2xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <div className={`text-xs font-medium uppercase tracking-widest mb-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                    Email
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    {personalInfo.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 hover:scale-105 active:scale-95 ${copied
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : isDark
                    ? 'border-white/10 bg-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                    : 'border-black/10 bg-black/5 text-zinc-600 hover:text-zinc-900 hover:border-black/20'
                  }`}
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copy email
                  </>
                )}
              </button>
            </div>

            {/* Location */}
            <div className={`glass rounded-2xl border p-5 flex items-center gap-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <MapPin size={18} className="text-orange-400" />
              </div>
              <div>
                <div className={`text-xs font-medium uppercase tracking-widest mb-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                  Location
                </div>
                <div className={`font-semibold text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <h3 className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                Connect
              </h3>
              {socialLinks.map(({ icon: Icon, label, handle, href, color, hoverText }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl border glass transition-all duration-200 hover:scale-[1.02] group ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/3'
                    } ${color}`}
                >
                  <Icon size={18} className={`shrink-0 transition-colors ${isDark ? 'text-zinc-500' : 'text-zinc-400'
                    } ${hoverText}`} />
                  <div>
                    <div className={`font-medium text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {label}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      {handle}
                    </div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-zinc-500">
                      <path d="M3 11L11 3M11 3H6M11 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`lg:col-span-3 ${visible ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className={`glass rounded-2xl border p-8 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'
              }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Send a message
              </h3>

              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Message sent!
                  </h4>
                  <p className={`text-sm text-center max-w-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                        Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Collins Oden"
                        required
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        required
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}>
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project or just say hi..."
                      required
                      rows={6}
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
