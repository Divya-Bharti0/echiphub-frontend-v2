import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Search, ChevronDown, BookOpen, Menu, X } from 'lucide-react'
import { PARTNERS } from '../lib/courseData'

interface NavbarProps {
  onOpenSearch?: () => void
  onToggleMyLearning?: () => void
  showMyLearning?: boolean
}

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Courses', href: '#courses' },
  { name: 'Labs', href: '#labs' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Workshops', href: '#workshops' },
  { name: 'Community', href: 'https://community.echiphub.in/', ext: true },
]

const MORE_LINKS = [
  { name: 'RTL → GDSII Roadmap', href: '#roadmap' },
  { name: 'Explore Technologies', href: '#technologies' },
  { name: 'EDA Tools Directory', href: '#tools' },
  { name: 'Developer Achievements', href: '#achievements' },
  { name: 'Community & Events', href: '#community' },
  { name: 'Academic Alliances', href: '#alliances' },
]

export default function Navbar({ onOpenSearch, onToggleMyLearning, showMyLearning }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#')
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const sections = ['#workshops', '#technologies', '#roadmap', '#github', '#projects', '#labs', '#courses', '#my-learning']
      let current = '#'
      for (const selector of sections) {
        const el = document.querySelector(selector)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 220 && rect.bottom >= 80) {
            current = selector
            break
          }
        }
      }
      setActiveHash(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-[1000] w-full max-w-full"
      style={{ background: '#fff', borderBottom: '1px solid #2254C4', boxShadow: scrolled ? '0 4px 24px rgba(16,32,64,0.08)' : 'none' }}
    >
      <div className={`w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 transition-[padding] duration-300 ${scrolled ? 'py-2 sm:py-2.5' : 'py-2.5 sm:py-3'}`}>
        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink min-w-0" role="list" aria-label="Partner logos">
          {PARTNERS.map(partner => (
            <a key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.name} role="listitem" className="flex items-center shrink min-w-0 transition-transform duration-200 hover:scale-[1.04]">
              <img src={partner.src} alt={partner.name} loading="eager" className={`w-auto max-w-[48px] min-[380px]:max-w-[65px] sm:max-w-[95px] md:max-w-none object-contain shrink ${scrolled ? 'h-6 min-[380px]:h-7 sm:h-8 md:h-8' : 'h-6 min-[380px]:h-7 sm:h-8 md:h-9'}`} />
            </a>
          ))}
        </div>

        <nav className="hidden lg:block shrink-0" aria-label="Main navigation">
          <ul className="flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map(link => {
              const isActive = activeHash === link.href
              return (
                <li key={link.name}>
                  <a href={link.href} {...(link.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} data-active={isActive} aria-current={isActive ? 'page' : undefined} className={`nav-link text-[13.5px] xl:text-[14.5px] font-bold transition-colors duration-200 ${isActive ? 'text-[#2254C4]' : 'text-[#1c1d1f] hover:text-[#2254C4]'}`}>
                    {link.name}
                  </a>
                </li>
              )
            })}
            <li className="relative" ref={moreRef}>
              <button type="button" aria-expanded={moreOpen} onClick={() => setMoreOpen(value => !value)} className="flex items-center gap-1 min-h-11 text-[13.5px] xl:text-[14.5px] font-bold text-[#1c1d1f] hover:text-[#2254C4] transition-colors cursor-pointer">
                More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 space-y-1">
                    {MORE_LINKS.map(link => <a key={link.name} href={link.href} onClick={() => setMoreOpen(false)} className="block px-3 py-2 min-h-11 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2254C4] hover:bg-blue-50/80 rounded-xl transition-colors">{link.name}</a>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button type="button" onClick={onOpenSearch} aria-label="Search resources" className="flex items-center gap-2 min-h-11 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-colors">
            <Search className="w-3.5 h-3.5 text-slate-500" /><span className="hidden sm:inline">Search</span><kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded border border-slate-200">⌘K</kbd>
          </button>
          <button type="button" onClick={onToggleMyLearning} aria-pressed={showMyLearning} className={`hidden sm:inline-flex items-center gap-1.5 min-h-11 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all ${showMyLearning ? 'bg-[#2254C4] text-white shadow-xs' : 'bg-blue-50 text-[#2254C4] hover:bg-blue-100 border border-blue-100'}`}>
            <BookOpen className="w-3.5 h-3.5" /><span>My Learning</span>
          </button>
          <a href="https://echiphub.in/wp-login.php" target="_blank" rel="noopener noreferrer" className="btn-shine min-h-11 inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13.5px] font-bold text-white transition-all duration-200 hover:brightness-110 shadow-xs" style={{ background: '#0f172a' }}>Login</a>
          <button type="button" onClick={() => setMobileOpen(value => !value)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation menu" className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-slate-200 px-4 sm:px-5 py-4 space-y-3 shadow-lg">
            <button type="button" onClick={() => { closeMobile(); onOpenSearch?.() }} className="w-full min-h-11 flex items-center justify-between p-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
              <span className="flex items-center gap-2"><Search className="w-4 h-4 text-slate-500" />Search courses, labs, projects...</span><span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">⌘K</span>
            </button>
            <button type="button" onClick={() => { closeMobile(); onToggleMyLearning?.() }} className="w-full min-h-11 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 text-[#2254C4] font-bold text-xs border border-blue-100">
              <BookOpen className="w-4 h-4" />{showMyLearning ? 'Viewing My Learning' : 'Open My Learning Dashboard'}
            </button>
            <ul className="space-y-1 pt-1">
              {NAV_LINKS.map(link => <li key={link.name}><a href={link.href} {...(link.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={closeMobile} className="flex items-center min-h-11 py-2 px-2 text-sm font-bold text-slate-800 hover:text-[#2254C4] hover:bg-slate-50 rounded-lg">{link.name}</a></li>)}
              {MORE_LINKS.map(link => <li key={link.name}><a href={link.href} onClick={closeMobile} className="flex items-center min-h-11 py-2 px-2 text-sm font-semibold text-slate-600 hover:text-[#2254C4] hover:bg-slate-50 rounded-lg">{link.name}</a></li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
