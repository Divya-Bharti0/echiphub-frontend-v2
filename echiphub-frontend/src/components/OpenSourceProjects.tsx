import { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, FolderGit2, Star, GitFork, Play } from 'lucide-react'
import { OPEN_SOURCE_PROJECTS, OpenSourceProject, VIRTUAL_LABS } from '../lib/courseData'

interface OpenSourceProjectsProps {
  onOpenLab: (labId: string) => void
  onOpenCourse?: (courseId: number) => void
}

export default function OpenSourceProjects({ onOpenLab, onOpenCourse }: OpenSourceProjectsProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const filteredProjects = selectedDifficulty === 'all'
    ? OPEN_SOURCE_PROJECTS
    : OPEN_SOURCE_PROJECTS.filter(p => p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase())

  return (
    <section id="projects" className="section relative bg-white border-b border-[#e2e8f0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading: "Build Something" */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-2.5">
              <Rocket className="w-3.5 h-3.5" /> Project Explorer
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Build Something Real
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              Synthesizable, open-source chip design projects connected directly to hands-on cloud labs and verified GitHub repositories.
            </p>
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            {['all', 'beginner', 'intermediate', 'advanced'].map(lvl => {
              const isActive = selectedDifficulty === lvl
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 8 Projects Grid with 3-Way Bridge (Project -> Lab -> GitHub) ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProjects.map((proj: OpenSourceProject, index: number) => {
            const lab = VIRTUAL_LABS.find(l => l.id === proj.relatedLabId)

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="group bg-slate-50 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-purple-300 shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Difficulty & GitHub Stars */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-white text-slate-700 border border-slate-200 shadow-2xs">
                      {proj.difficulty}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" /> {proj.stars}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <GitFork className="w-3 h-3" /> {proj.forks}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-extrabold text-[#0f172a] group-hover:text-purple-700 transition-colors tracking-tight leading-snug mb-2">
                    {proj.name}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                    {proj.shortDesc}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.technologies.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-white text-slate-700 border border-slate-200/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* 3-Step Connection Visual Box: PROJECT → LAB → GITHUB */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 space-y-2 mb-4 text-[11px]">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Connected Pipeline
                    </div>

                    {/* Step 1: Project */}
                    <div className="flex items-center gap-2 text-slate-700 font-semibold truncate">
                      <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                      <span className="truncate">Build: {proj.targetWhatYouBuild}</span>
                    </div>

                    {/* Step 2: Lab */}
                    <div className="flex items-center gap-2 text-slate-700 font-semibold truncate">
                      <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                      <span className="truncate">Lab: {lab?.title || 'Virtual Lab'}</span>
                    </div>

                    {/* Step 3: GitHub */}
                    <div className="flex items-center gap-2 text-slate-700 font-semibold truncate">
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                      <span className="truncate font-mono text-[10px]">Source on GitHub</span>
                    </div>
                  </div>
                </div>

                {/* 3 Action Buttons Row: View Project / Open Lab / GitHub */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onOpenLab(proj.relatedLabId)}
                      className="py-2 px-2.5 rounded-xl text-xs font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Open Lab</span>
                    </button>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-1"
                    >
                      <FolderGit2 className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  </div>

                  {proj.relatedCourseId && (
                    <button
                      onClick={() => onOpenCourse && onOpenCourse(proj.relatedCourseId!)}
                      className="w-full py-1.5 text-center text-[11px] font-bold text-[#2254C4] hover:underline cursor-pointer"
                    >
                      Explore Related Course &rarr;
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
