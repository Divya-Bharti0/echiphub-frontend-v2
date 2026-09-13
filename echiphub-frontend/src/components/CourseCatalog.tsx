import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Sparkles, RefreshCw } from 'lucide-react'
import { Course, CourseCategory, CourseLevel, CourseStatus, ContentFormat } from '../lib/courseData'
import CourseCard from './CourseCard'

interface CourseCatalogProps {
  courses: Course[]
  onSelectCourse: (course: Course) => void
}

const CATEGORIES: { key: CourseCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Domains' },
  { key: 'rtl', label: 'RTL' },
  { key: 'verification', label: 'Verification' },
  { key: 'physical-design', label: 'Physical Design' },
  { key: 'analog', label: 'Analog' },
  { key: 'riscv', label: 'RISC-V' },
  { key: 'fpga', label: 'FPGA' },
  { key: 'eda', label: 'EDA' },
]

const LEVELS: { key: CourseLevel | 'all'; label: string }[] = [
  { key: 'all', label: 'All Levels' },
  { key: 'Beginner', label: 'Beginner' },
  { key: 'Intermediate', label: 'Intermediate' },
  { key: 'Advanced', label: 'Advanced' },
]

const STATUSES: { key: CourseStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All Statuses' },
  { key: 'live', label: 'Live' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
]

const FORMATS: { key: ContentFormat | 'all'; label: string }[] = [
  { key: 'all', label: 'All Formats' },
  { key: 'course', label: 'Courses' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'lab', label: 'Labs' },
]

export default function CourseCatalog({ courses, onSelectCourse }: CourseCatalogProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CourseCategory | 'all'>('all')
  const [level, setLevel] = useState<CourseLevel | 'all'>('all')
  const [status, setStatus] = useState<CourseStatus | 'all'>('all')
  const [format, setFormat] = useState<ContentFormat | 'all'>('all')

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // Category
      if (category !== 'all' && c.category !== category) return false
      // Level
      if (level !== 'all' && c.level !== level) return false
      // Status
      if (status !== 'all' && c.status !== status) return false
      // Format
      if (format !== 'all' && c.format !== format) return false
      // Search
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesTitle = c.title.toLowerCase().includes(q)
        const matchesDesc = c.desc.toLowerCase().includes(q)
        const matchesTech = c.technologies.some(t => t.toLowerCase().includes(q))
        if (!matchesTitle && !matchesDesc && !matchesTech) return false
      }
      return true
    })
  }, [courses, category, level, status, format, search])

  const hasActiveFilters = category !== 'all' || level !== 'all' || status !== 'all' || format !== 'all' || search.trim() !== ''

  const resetFilters = () => {
    setCategory('all')
    setLevel('all')
    setStatus('all')
    setFormat('all')
    setSearch('')
  }

  return (
    <section id="courses" className="section relative bg-white border-b border-[#e2e8f0] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pcb-bg opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(41,171,226,.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Open edX Course Discovery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Explore Semiconductor Courses
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Industry-aligned curriculum covering RTL design, physical design, RISC-V, and analog VLSI.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#f8fafc] border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs mb-10">
          {/* Top Row: Instant Search & Format Toggles */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses by keyword or tool..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2254C4]/20 focus:border-[#2254C4]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Format Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1 hidden lg:inline">
                Format:
              </span>
              {FORMATS.map(f => {
                const isActive = format === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setFormat(f.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#2254C4] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom Row: Category & Dropdowns */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            {/* Category horizontal pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full scrollbar-none py-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1 shrink-0 hidden sm:inline">
                Domain:
              </span>
              {CATEGORIES.map(cat => {
                const isActive = category === cat.key
                return (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2254C4] to-[#29abe2] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Select dropdowns for Level and Status */}
            <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={level}
                  onChange={e => setLevel(e.target.value as CourseLevel | 'all')}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#2254C4]"
                >
                  {LEVELS.map(l => (
                    <option key={l.key} value={l.key}>{l.label}</option>
                  ))}
                </select>

                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as CourseStatus | 'all')}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#2254C4]"
                >
                  {STATUSES.map(s => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    title="Reset all filters"
                    className="p-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <span className="text-slate-900">{filteredCourses.length}</span> Courses
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[#2254C4] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                >
                  <CourseCard course={course} onSelect={onSelectCourse} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-semibold">No courses match your filter criteria.</p>
            <button
              onClick={resetFilters}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-[#2254C4] text-white hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
