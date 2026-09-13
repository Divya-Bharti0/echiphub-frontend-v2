import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, Play, FolderGit2, Cpu, Wrench, Calendar, ArrowRight } from 'lucide-react'
import { COURSES, VIRTUAL_LABS, OPEN_SOURCE_PROJECTS, GITHUB_REPOS, TECHNOLOGIES, WORKSHOPS, Course, VirtualLab, OpenSourceProject, GitHubRepo, TechItem, WorkshopItem } from '../lib/courseData'

interface GlobalSearchModalProps {
  open: boolean
  onClose: () => void
  onSelectCourse: (course: Course) => void
  onSelectLab: (lab: VirtualLab) => void
  onSelectProject?: (proj: OpenSourceProject) => void
  onSelectTech?: (techId: string) => void
}

export default function GlobalSearchModal({
  open,
  onClose,
  onSelectCourse,
  onSelectLab,
  onSelectTech
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  // Keyboard shortcut listener for escape / cmd+k
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
      }
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return {
        courses: COURSES.slice(0, 3),
        labs: VIRTUAL_LABS.slice(0, 3),
        projects: OPEN_SOURCE_PROJECTS.slice(0, 3),
        repos: GITHUB_REPOS.slice(0, 3),
        technologies: TECHNOLOGIES.slice(0, 4),
        workshops: WORKSHOPS.slice(0, 2),
        total: COURSES.length + VIRTUAL_LABS.length
      }
    }

    const matchesStr = (str?: string) => Boolean(str && str.toLowerCase().includes(q))
    const matchesArr = (arr?: string[]) => Boolean(arr && arr.some(item => item.toLowerCase().includes(q)))

    const filteredCourses = COURSES.filter(
      c => matchesStr(c.title) || matchesStr(c.desc) || matchesStr(c.category) || matchesArr(c.technologies)
    )

    const filteredLabs = VIRTUAL_LABS.filter(
      l => matchesStr(l.title) || matchesStr(l.desc) || matchesStr(l.category) || matchesArr(l.technologies)
    )

    const filteredProjects = OPEN_SOURCE_PROJECTS.filter(
      p => matchesStr(p.name) || matchesStr(p.shortDesc) || matchesArr(p.technologies)
    )

    const filteredRepos = GITHUB_REPOS.filter(
      r => matchesStr(r.name) || matchesStr(r.description) || matchesStr(r.language) || matchesArr(r.topics)
    )

    const filteredTechs = TECHNOLOGIES.filter(
      t => matchesStr(t.name) || matchesStr(t.category) || matchesStr(t.desc)
    )

    const filteredWorkshops = WORKSHOPS.filter(
      w => matchesStr(w.title) || matchesStr(w.desc) || matchesArr(w.technologies)
    )

    const total = filteredCourses.length + filteredLabs.length + filteredProjects.length + filteredRepos.length + filteredTechs.length + filteredWorkshops.length

    return {
      courses: filteredCourses,
      labs: filteredLabs,
      projects: filteredProjects,
      repos: filteredRepos,
      technologies: filteredTechs,
      workshops: filteredWorkshops,
      total
    }
  }, [query])

  if (!open) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1300] flex items-start justify-center p-3 sm:p-6 pt-[8vh] sm:pt-[10vh] overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Search Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[80vh]"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Courses, Labs, Projects, RISC-V, OpenLane, SPICE..."
              className="w-full bg-transparent border-0 text-slate-900 placeholder:text-slate-400 text-base font-medium focus:outline-none focus:ring-0"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
                ESC
              </kbd>
            )}
          </div>

          {/* Search Results / Content */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1 text-sm divide-y divide-slate-100">
            {/* 1. Courses Section */}
            {results.courses.length > 0 && (
              <div className="pt-2 first:pt-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-[#2254C4]" />
                  <span>Courses ({results.courses.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.courses.map((c: Course) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onClose()
                        onSelectCourse(c)
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-blue-50/60 text-left flex items-center justify-between group transition-colors border border-transparent hover:border-blue-100"
                    >
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-[#2254C4] transition-colors">
                          {c.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {c.desc}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#2254C4] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        View Course <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Virtual Labs Section */}
            {results.labs.length > 0 && (
              <div className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Play className="w-3.5 h-3.5 text-cyan-500 fill-current" />
                  <span>Virtual Labs ({results.labs.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.labs.map((l: VirtualLab) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        onClose()
                        onSelectLab(l)
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-cyan-50/60 text-left flex items-center justify-between group transition-colors border border-transparent hover:border-cyan-100"
                    >
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {l.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {l.desc}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-cyan-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Launch Lab <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Open-Source Projects */}
            {results.projects.length > 0 && (
              <div className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Open-Source Projects ({results.projects.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.projects.map((p: OpenSourceProject) => (
                    <a
                      key={p.id}
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center justify-between group transition-colors border border-transparent hover:border-slate-200 block"
                    >
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {p.shortDesc}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 shrink-0 flex items-center gap-1">
                        ⭐ {p.stars} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 4. GitHub Repositories */}
            {results.repos.length > 0 && (
              <div className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <FolderGit2 className="w-3.5 h-3.5 text-slate-700" />
                  <span>GitHub Repositories ({results.repos.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.repos.map((r: GitHubRepo) => (
                    <a
                      key={r.id}
                      href={r.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center justify-between group transition-colors border border-transparent hover:border-slate-200 block"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {r.description}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-mono shrink-0">
                        {r.language}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Technologies */}
            {results.technologies.length > 0 && (
              <div className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Technologies ({results.technologies.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.technologies.map((t: TechItem) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onClose()
                        onSelectTech && onSelectTech(t.id)
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-[#2254C4] font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-200/80"
                    >
                      <Cpu className="w-3 h-3 text-[#2254C4]" />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Workshops */}
            {results.workshops.length > 0 && (
              <div className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Workshops ({results.workshops.length})</span>
                </div>
                <div className="space-y-1.5">
                  {results.workshops.map((w: WorkshopItem) => (
                    <a
                      key={w.id}
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center justify-between group transition-colors border border-transparent hover:border-slate-200 block"
                    >
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {w.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {w.date} • {w.desc}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                        {w.status}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {results.total === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 font-medium">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for Verilog, RISC-V, OpenLane, SPICE, or Timing.</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-between px-4">
            <span>Search across all eChipHub educational resources</span>
            <span className="hidden sm:inline">Press ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
