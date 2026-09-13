import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, CircuitBoard, Gauge, Layers3, MonitorPlay, LockKeyhole, Sparkles, BookOpen, Play, FolderGit2, ArrowRight, Activity, Terminal, GitBranch } from 'lucide-react'
import { TECHNOLOGIES, TechItem, COURSES, VIRTUAL_LABS, OPEN_SOURCE_PROJECTS, GITHUB_REPOS, Course, VirtualLab } from '../lib/courseData'

interface TechnologyExplorerProps {
  onSelectCourse: (course: Course) => void
  onOpenLab: (lab: VirtualLab) => void
}

const ICON_MAP: Record<string, React.ElementType> = {
  CircuitBoard,
  Cpu,
  Gauge,
  Layers3,
  MonitorPlay,
  LockKeyhole,
  Sparkles,
  Activity,
  Terminal,
  GitBranch,
  FolderGit2,
}

export default function TechnologyExplorer({ onSelectCourse, onOpenLab }: TechnologyExplorerProps) {
  const [selectedTechId, setSelectedTechId] = useState<string>('verilog')

  const activeTech = TECHNOLOGIES.find(t => t.id === selectedTechId) || TECHNOLOGIES[0]

  // Filter linked content
  const linkedCourses = COURSES.filter(c =>
    c.technologies.some(tech => tech.toLowerCase().includes(activeTech.name.toLowerCase()))
  )

  const linkedLabs = VIRTUAL_LABS.filter(l =>
    l.technologies.some(tech => tech.toLowerCase().includes(activeTech.name.toLowerCase()))
  )

  const linkedProjects = OPEN_SOURCE_PROJECTS.filter(p =>
    p.technologies.some(tech => tech.toLowerCase().includes(activeTech.name.toLowerCase()))
  )

  const linkedRepos = GITHUB_REPOS.filter(r =>
    r.topics.some(t => t.toLowerCase().includes(activeTech.name.toLowerCase())) ||
    r.language.toLowerCase().includes(activeTech.name.toLowerCase())
  )

  return (
    <section id="technologies" className="section relative bg-white border-b border-[#e2e8f0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Silicon Toolchains &amp; Stacks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Explore Technologies
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Click any EDA tool, language or architecture to view relevant courses, virtual labs, projects, and GitHub repositories.
          </p>
        </div>

        {/* Technology Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-10">
          {TECHNOLOGIES.map((tech: TechItem) => {
            const isSelected = tech.id === selectedTechId
            const Icon = ICON_MAP[tech.iconName] || Cpu
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTechId(tech.id)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer text-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#2254C4] to-[#1d4ed8] border-[#2254C4] text-white shadow-md shadow-blue-500/25 scale-[1.03]'
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#2254C4] shadow-xs'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight">{tech.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active Technology Content Dashboard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTech.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-6 sm:p-8"
          >
            {/* Tech Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-6">
              <div>
                <div className="inline-block font-mono text-[11px] font-bold text-[#2254C4] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100 mb-1.5">
                  {activeTech.category}
                </div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
                  {activeTech.name}
                </h3>
                <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                  {activeTech.desc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-slate-700">
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  Courses: {activeTech.coursesCount}
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  Labs: {activeTech.labsCount}
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  Projects: {activeTech.projectsCount}
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  Repositories: {activeTech.reposCount}
                </span>
                <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  Tools: {activeTech.toolsCount}
                </span>
              </div>
            </div>

            {/* Categorized Resource Columns */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Courses Column */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">
                    <BookOpen className="w-4 h-4 text-[#2254C4]" />
                    <span>Related Courses</span>
                  </div>
                  {linkedCourses.length > 0 ? (
                    <div className="space-y-2.5">
                      {linkedCourses.map(c => (
                        <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">{c.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{c.level} • {c.duration}</div>
                          <button
                            onClick={() => onSelectCourse(c)}
                            className="mt-2 text-xs font-bold text-[#2254C4] hover:underline inline-flex items-center gap-1"
                          >
                            Explore Course <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">No dedicated courses registered.</p>
                  )}
                </div>
              </div>

              {/* Virtual Labs Column */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">
                    <Play className="w-4 h-4 text-cyan-600 fill-current" />
                    <span>Virtual Labs</span>
                  </div>
                  {linkedLabs.length > 0 ? (
                    <div className="space-y-2.5">
                      {linkedLabs.map(l => (
                        <div key={l.id} className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100">
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">{l.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Est. {l.estimatedTime} • {l.difficulty}</div>
                          <button
                            onClick={() => onOpenLab(l)}
                            className="mt-2 text-xs font-bold text-cyan-700 hover:underline inline-flex items-center gap-1"
                          >
                            Launch Lab Simulator <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">No dedicated labs configured.</p>
                  )}
                </div>
              </div>

              {/* GitHub Projects & Repos Column */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">
                    <FolderGit2 className="w-4 h-4 text-slate-700" />
                    <span>GitHub Repositories</span>
                  </div>
                  {(linkedProjects.length > 0 || linkedRepos.length > 0) ? (
                    <div className="space-y-2.5">
                      {linkedProjects.map(p => (
                        <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">⭐ {p.stars} stars • {p.difficulty}</div>
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-xs font-bold text-slate-800 hover:underline inline-flex items-center gap-1"
                          >
                            View Repository <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">Explore global repositories.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
