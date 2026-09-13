import { Clock, BarChart2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { Course, STATUS_META } from '../lib/courseData'

interface CourseCardProps {
  course: Course
  onSelect: (course: Course) => void
}

export default function CourseCard({ course, onSelect }: CourseCardProps) {
  const meta = STATUS_META[course.status]

  return (
    <article
      className="group relative bg-white rounded-3xl border border-slate-200/85 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full min-h-[440px]"
    >
      {/* Top Banner with Image & Overlays */}
      <div>
        <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
          <img
            src={course.img}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border shadow-xs"
              style={{ color: meta.fg, background: meta.bg, borderColor: meta.bd }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.dot }} />
              {meta.label}
            </span>
          </div>

          {/* Location / Center */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-slate-800 backdrop-blur-md">
              {course.centre}
            </span>
          </div>

          {/* Bottom Metas (Level & Duration) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="inline-flex items-center gap-1 font-semibold text-cyan-300 bg-black/40 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-xs">
              <BarChart2 className="w-3 h-3" /> {course.level}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-slate-200 bg-black/40 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-xs">
              <Clock className="w-3 h-3 text-cyan-300" /> {course.duration}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {course.technologies.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-[#2254C4] border border-blue-100"
              >
                {tech}
              </span>
            ))}
            {course.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-100">
                +{course.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Course Title */}
          <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a] group-hover:text-[#2254C4] transition-colors tracking-tight leading-snug line-clamp-2 mb-2 min-h-[48px]">
            {course.title}
          </h3>

          {/* Normal State: Short Description */}
          <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
            {course.desc}
          </p>

          {/* "Includes" Package Summary Box */}
          <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1 text-xs">
            <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2254C4]" /> Includes
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11.5px] text-slate-700 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {course.includes.modulesCount} Modules
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {course.includes.labsCount} Labs
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {course.includes.projectsCount} Projects
              </span>
              {course.includes.hasGithubRepo && (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> GitHub Repo
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        {course.enrolled && (
          <div className="mb-2.5 p-2 rounded-xl bg-emerald-50/60 border border-emerald-100/80 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Enrolled
            </span>
            <span className="font-mono font-bold text-emerald-700">{course.progress}%</span>
          </div>
        )}

        <button
          onClick={() => onSelect(course)}
          className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#0f172a] group-hover:bg-gradient-to-r group-hover:from-[#2254C4] group-hover:to-[#29abe2] text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer"
        >
          <span>{course.enrolled ? 'Continue Learning' : 'Start Learning'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  )
}
