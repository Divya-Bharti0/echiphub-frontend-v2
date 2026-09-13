import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ChevronDown, Clock, BarChart2, BookOpen, Layers, GitBranch, ExternalLink, Play } from 'lucide-react'
import { Course, STATUS_META, COURSE_URL } from '../lib/courseData'

interface CourseDetailModalProps {
  course: Course | null
  open: boolean
  onClose: () => void
  onEnrollToggle?: (courseId: number) => void
  onOpenLab?: (labId: string) => void
}

export default function CourseDetailModal({
  course,
  open,
  onClose,
  onEnrollToggle,
  onOpenLab
}: CourseDetailModalProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>('w1')

  if (!open || !course) return null

  const meta = STATUS_META[course.status]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-[#0d234d] via-[#14315f] to-[#091a3e] p-6 sm:p-8 text-white">
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Status Badge */}
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                style={{ color: meta.fg, background: meta.bg, borderColor: meta.bd }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: meta.dot }} />
                {meta.label}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-200 border border-white/15">
                <BarChart2 className="w-3.5 h-3.5" />
                {course.level}
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/15">
                <Clock className="w-3.5 h-3.5" />
                {course.duration}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
              {course.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-4 max-w-2xl">
              {course.desc}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {course.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-md text-[11.5px] font-mono font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Enrollment / Action Bar */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onEnrollToggle && onEnrollToggle(course.id)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg ${
                    course.enrolled
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25'
                      : 'bg-gradient-to-r from-[#2254C4] to-[#29abe2] hover:brightness-110 text-white shadow-blue-500/25'
                  }`}
                >
                  {course.enrolled ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Enrolled ({course.progress || 0}%)
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Enroll / Start Learning
                    </>
                  )}
                </button>

                <a
                  href={COURSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors inline-flex items-center gap-1.5"
                >
                  Official Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {course.enrolled && (
                <div className="flex items-center gap-2.5 min-w-[180px]">
                  <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-300">
                    {course.progress || 0}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-6 sm:p-8 space-y-7 overflow-y-auto flex-1 divide-y divide-slate-100">
            {/* What you'll learn */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#2254C4]" />
                <h3 className="text-base font-extrabold text-[#0f172a] tracking-tight">
                  What you&apos;ll learn
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {course.learnPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2254C4] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13px] font-medium text-slate-700 leading-snug">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Outline */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#2254C4]" />
                  <h3 className="text-base font-extrabold text-[#0f172a] tracking-tight">
                    Course Content &amp; Syllabus
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {course.modules.length} Modules
                </span>
              </div>

              <div className="space-y-2">
                {course.modules.map(m => {
                  const isOpen = expandedModule === m.id
                  return (
                    <div
                      key={m.id}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-colors"
                    >
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : m.id)}
                        className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-[#2254C4] border border-blue-100">
                            {m.week}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {m.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400">
                          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                            {m.duration}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#2254C4]' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-3.5 pt-1 bg-slate-50/70 border-t border-slate-100">
                          <ul className="space-y-1.5">
                            {m.lessons.map((lesson, lIdx) => (
                              <li
                                key={lIdx}
                                className="flex items-center gap-2 text-xs text-slate-600 pl-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Connected Hands-on Lab & Project */}
            {(course.labId || course.githubRepo) && (
              <div className="pt-6">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  Hands-on Practice &amp; Projects
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.labId && (
                    <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800 mb-1">
                          <Play className="w-3.5 h-3.5 fill-current text-cyan-600" /> Connected Virtual Lab
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          Interactive Cloud Environment
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onClose()
                          onOpenLab && onOpenLab(course.labId!)
                        }}
                        className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-700 bg-cyan-100 hover:bg-cyan-200 transition-colors inline-flex items-center gap-1 self-start"
                      >
                        Open Lab Simulator &rarr;
                      </button>
                    </div>
                  )}

                  {course.githubRepo && (
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
                          <GitBranch className="w-3.5 h-3.5 text-slate-900" /> GitHub Repository
                        </div>
                        <div className="text-sm font-bold text-slate-900 font-mono text-xs truncate">
                          {course.githubRepo}
                        </div>
                      </div>
                      <a
                        href={`https://github.com/${course.githubRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-200 hover:bg-slate-300 transition-colors inline-flex items-center gap-1 self-start"
                      >
                        View Code on GitHub &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
