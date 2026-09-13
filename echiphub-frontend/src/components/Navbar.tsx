import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Search, ChevronDown, BookOpen, ExternalLink, Menu, X, Cpu } from 'lucide-react'
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
      const secs = ['#workshops', '#technologies', '#roadmap', '#github', '#projects', '#labs', '#courses', '#my-learning']
      let cur = '#'
      for (const s of secs) {
        const el = document.querySelector(s)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 220 && r.bottom >= 80) {
            cur = s
            break
          }
        }
      }
      setActiveHash(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-[1000] w-full max-w-full"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #2254C4',
        boxShadow: scrolled ? '0 4px 24px rgba(16,32,64,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        className={`w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 transition-[padding] duration-300 ${
          scrolled ? 'py-2 sm:py-2.5' : 'py-2.5 sm:py-3'
        }`}
      >
        {/* ── Partner / Institutional Logos ── */}
        <div
          className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink min-w-0"
          role="list"
          aria-label="Partner logos"
        >
          {PARTNERS.map(l => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.name}
              role="listitem"
              className="flex items-center shrink min-w-0 transition-transform duration-200 hover:scale-[1.04]"
            >
              <img
                src={l.src}
                alt={l.name}
                loading="eager"
                className={`w-auto max-w-[48px] min-[380px]:max-w-[65px] sm:max-w-[95px] md:max-w-none object-contain shrink transition-[height] duration-300 ${
                  scrolled ? 'h-6 min-[380px]:h-7 sm:h-8 md:h-8' : 'h-6 min-[380px]:h-7 sm:h-8 md:h-9'
                }`}
              />
            </a>
          ))}
        </div>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:block shrink-0" aria-label="Main navigation">
          <ul className="flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map(l => {
              const isActive = activeHash === l.href
              return (
                <li key={l.name}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    data-active={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link text-[13.5px] xl:text-[14.5px] font-bold transition-colors duration-200 ${
                      isActive ? 'text-[#2254C4]' : 'text-[#1c1d1f] hover:text-[#2254C4]'
                    }`}
                  >
                    {l.name}
                  </a>
                </li>
              )
            })}

            {/* More Dropdown */}
            <li className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(v => !v)}
                className="flex items-center gap-1 text-[13.5px] xl:text-[14.5px] font-bold text-[#1c1d1f] hover:text-[#2254C4] transition-colors py-1 cursor-pointer"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 space-y-1"
                  >
                    {MORE_LINKS.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2254C4] hover:bg-blue-50/80 rounded-xl transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        {/* ── Right side Actions: Search, My Learning, Login, Hamburger ── */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search resources"
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white rounded border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* My Learning Toggle Button */}
          <button
            onClick={onToggleMyLearning}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all ${
              showMyLearning
                ? 'bg-[#2254C4] text-white shadow-xs'
                : 'bg-blue-50 text-[#2254C4] hover:bg-blue-100 border border-blue-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Learning</span>
          </button>

          {/* Login Button */}
          <a
            href="https://echiphub.in/wp-login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13.5px] font-bold text-white transition-all duration-200 hover:brightness-110 shadow-xs"
            style={{ background: '#0f172a' }}
          >
            Login
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-200 px-5 py-4 space-y-3 shadow-lg"
          >
            {/* Search Trigger in Mobile */}
            <button
              onClick={() => {
                setMobileOpen(false)
                onOpenSearch && onOpenSearch()
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-500" />
                <span>Search courses, labs, projects...</span>
              </div>
              <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </span>
            </button>

            {/* My Learning Button in Mobile */}
            <button
              onClick={() => {
                setMobileOpen(false)
                onToggleMyLearning && onToggleMyLearning()
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 text-[#2254C4] font-bold text-xs border border-blue-100"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showMyLearning ? 'Viewing My Learning' : 'Open My Learning Dashboard'}</span>
            </button>

            {/* Main Links */}
            <ul className="space-y-1 pt-1">
              {NAV_LINKS.map(l => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 px-2 text-sm font-bold text-slate-800 hover:text-[#2254C4] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
              {MORE_LINKS.map(l => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 px-2 text-sm font-semibold text-slate-600 hover:text-[#2254C4] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
