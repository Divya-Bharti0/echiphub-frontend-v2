import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Award, ArrowRight, Sparkles, Play, FolderGit2, Flame } from 'lucide-react'
import { Course, VIRTUAL_LABS, OPEN_SOURCE_PROJECTS } from '../lib/courseData'

interface LearningDashboardProps {
  enrolledCourses: Course[]
  allCourses: Course[]
  onSelectCourse: (course: Course) => void
  onOpenLab: (labId: string) => void
  onExploreCourses: () => void
}

type DashboardTab = 'continue' | 'recommended' | 'recent' | 'completed' | 'saved'

const CHIP_PROGRESS_TRACKS = [
  { name: 'RTL Design', pct: 100, color: 'bg-emerald-500' },
  { name: 'Verification', pct: 80, color: 'bg-blue-500' },
  { name: 'Synthesis', pct: 60, color: 'bg-cyan-500' },
  { name: 'Physical Design', pct: 40, color: 'bg-purple-500' },
  { name: 'GDSII Sign-off', pct: 20, color: 'bg-amber-500' },
]

export default function LearningDashboard({
  enrolledCourses,
  allCourses,
  onSelectCourse,
  onOpenLab,
  onExploreCourses
}: LearningDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('continue')

  const totalEnrolled = enrolledCourses.length
  const avgProgress = totalEnrolled > 0
    ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalEnrolled)
    : 0

  // Filter courses based on tab
  const displayedCourses = (() => {
    switch (activeTab) {
      case 'continue':
        return enrolledCourses.filter(c => (c.progress || 0) < 100)
      case 'recommended':
        return allCourses.filter(c => !c.enrolled)
      case 'recent':
        return enrolledCourses.slice(0, 2)
      case 'completed':
        return enrolledCourses.filter(c => c.status === 'completed' || (c.progress || 0) >= 80)
      case 'saved':
        return allCourses.slice(2, 4)
    }
  })()

  return (
    <section id="my-learning" className="section relative bg-gradient-to-b from-white to-[#f4f7fc] border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header with learner stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" /> Learner Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Your Learning Journey
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl">
              Personalized dashboard tracking your active course progress, next virtual labs, and open-source project code.
            </p>
          </div>

          {/* Quick Metrics & Streak */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Learning Streak</div>
                <div className="text-base font-extrabold text-slate-900">4 Days Active</div>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2254C4] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Enrolled</div>
                <div className="text-base font-extrabold text-slate-900">{totalEnrolled} Courses</div>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Average Progress</div>
                <div className="text-base font-extrabold text-slate-900">{avgProgress}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Dashboard Tabs & Chip Design Progress Grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          {/* Main Enrolled Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200/80 scrollbar-none">
              {[
                { key: 'continue' as DashboardTab, label: 'Continue Learning' },
                { key: 'recommended' as DashboardTab, label: 'Recommended for You' },
                { key: 'recent' as DashboardTab, label: 'Recently Viewed' },
                { key: 'completed' as DashboardTab, label: 'Completed' },
                { key: 'saved' as DashboardTab, label: 'Saved' },
              ].map(t => {
                const isActive = activeTab === t.key
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#2254C4] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Continuous Learning Loop Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {displayedCourses.length > 0 ? (
                  displayedCourses.map(course => {
                    const progress = course.progress || 0
                    const relatedLab = VIRTUAL_LABS.find(l => l.id === course.labId)
                    const relatedProj = OPEN_SOURCE_PROJECTS.find(p => p.id === course.projectId)

                    return (
                      <div
                        key={course.id}
                        className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Course Core Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-slate-900 overflow-hidden shrink-0">
                              <img
                                src={course.img}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded text-[10.5px] font-bold font-mono bg-blue-50 text-[#2254C4] border border-blue-100">
                                  {course.level}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">
                                  {course.duration}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a] leading-snug">
                                {course.title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:shrink-0">
                            <button
                              onClick={() => onSelectCourse(course)}
                              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#2254C4] hover:bg-[#1a429b] text-white transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                              <span>Continue Learning</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar & Current Module */}
                        <div className="py-3.5 border-b border-slate-100 grid sm:grid-cols-2 gap-4 items-center">
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Current:
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                              {course.currentModule || course.modules[0]?.title || 'Module 1'}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-xs font-bold mb-1">
                              <span className="text-slate-500">Course Progress</span>
                              <span className="font-mono text-[#2254C4]">{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#2254C4] to-[#29abe2] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* ── Next Step in Continuous Learning Loop: Next Lab & Related GitHub ── */}
                        <div className="pt-3.5 grid sm:grid-cols-2 gap-3 text-xs">
                          {relatedLab && (
                            <div className="p-3 rounded-2xl bg-cyan-50/60 border border-cyan-100 flex items-center justify-between">
                              <div className="truncate mr-2">
                                <span className="font-bold text-cyan-800 text-[11px] uppercase tracking-wider block">
                                  Next:
                                </span>
                                <span className="font-extrabold text-slate-900 truncate block">
                                  {relatedLab.title}
                                </span>
                              </div>
                              <button
                                onClick={() => onOpenLab(relatedLab.id)}
                                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1 shadow-2xs"
                              >
                                <Play className="w-3 h-3 fill-current" /> Open Lab &rarr;
                              </button>
                            </div>
                          )}

                          {relatedProj && (
                            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                              <div className="truncate mr-2">
                                <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider block">
                                  Related:
                                </span>
                                <span className="font-extrabold text-slate-900 truncate block">
                                  {relatedProj.name}
                                </span>
                              </div>
                              <a
                                href={relatedProj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1 shadow-2xs"
                              >
                                <FolderGit2 className="w-3 h-3" /> View Repo &rarr;
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="p-10 text-center bg-white rounded-3xl border border-slate-200">
                    <p className="text-slate-500 font-medium">No items found under this tab.</p>
                    <button
                      onClick={onExploreCourses}
                      className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-[#2254C4] text-white hover:bg-blue-700 transition-colors"
                    >
                      Browse All Courses
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Visualization Dashboard (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2254C4] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Progress Overview
                </div>
                <h3 className="text-xl font-extrabold text-[#0f172a] tracking-tight">
                  Chip Design Progress
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Overall progression across the end-to-end silicon implementation spectrum.
                </p>
              </div>

              {/* Progress Track Bars */}
              <div className="space-y-4">
                {CHIP_PROGRESS_TRACKS.map(track => (
                  <div key={track.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700">{track.name}</span>
                      <span className="font-mono text-slate-900">{track.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${track.color} rounded-full transition-all duration-700`}
                        style={{ width: `${track.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="#roadmap"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-bold text-[#2254C4] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full RTL → GDSII Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
