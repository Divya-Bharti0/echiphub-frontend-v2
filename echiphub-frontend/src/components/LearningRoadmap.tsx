import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Play, BookOpen, FolderGit2, Wrench, ChevronRight } from 'lucide-react'
import { ROADMAP_STAGES, RoadmapStage, COURSES, VIRTUAL_LABS, Course, VirtualLab } from '../lib/courseData'

interface LearningRoadmapProps {
  onSelectCourse: (course: Course) => void
  onOpenLab: (lab: VirtualLab) => void
}

export default function LearningRoadmap({ onSelectCourse, onOpenLab }: LearningRoadmapProps) {
  const [selectedStageId, setSelectedStageId] = useState<string>('rtl')

  const currentStage = ROADMAP_STAGES.find(s => s.id === selectedStageId) || ROADMAP_STAGES[0]
  const relatedCourse = COURSES.find(c => c.id === currentStage.courseId)
  const relatedLab = VIRTUAL_LABS.find(l => l.id === currentStage.labId)

  return (
    <section id="roadmap" className="section relative bg-gradient-to-b from-[#09162f] via-[#0d234d] to-[#09162f] text-white overflow-hidden">
      {/* Background circuits */}
      <div className="absolute inset-0 pcb-bg opacity-[0.07] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(41,171,226,.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Semiconductor Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            RTL &rarr; GDSII Learning Path
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Click any phase along the semiconductor ASIC design pipeline to view its connected courses, virtual labs, EDA tools, and GitHub repositories.
          </p>
        </div>

        {/* Interactive Step Sequence Bar (9 Stages) */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5 mb-10">
          {ROADMAP_STAGES.map((stage: RoadmapStage, idx: number) => {
            const isSelected = stage.id === selectedStageId
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`relative flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#2254C4] to-[#123687] border-cyan-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-[1.03]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <span className="font-mono text-[10.5px] font-bold text-cyan-300 tracking-wider">
                  {stage.step}
                </span>
                <span className="text-xs sm:text-sm font-extrabold mt-1 tracking-tight leading-snug">
                  {stage.name}
                </span>

                {idx < ROADMAP_STAGES.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 z-10 pointer-events-none" />
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Stage Detail Panel (Connected Learning -> Lab -> Project -> GitHub) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-[#0b1c3d]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl"
          >
            {/* Stage Title & Short Description */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    STAGE {currentStage.step}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Semiconductor Flow Step
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {currentStage.name}
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                  {currentStage.shortDesc}
                </p>
              </div>

              {/* Tools List */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-1">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" /> Target Tools:
                </div>
                {currentStage.tools.map(tool => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/25"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Connected Pillars Grid: Course | Lab | GitHub */}
            <div className="grid sm:grid-cols-3 gap-5">
              {/* 1. Related Course */}
              {relatedCourse && (
                <div className="bg-[#071328] rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
                      <BookOpen className="w-3.5 h-3.5" /> 1. Learn (Course)
                    </div>
                    <div className="text-sm font-extrabold text-white line-clamp-2 mb-1.5">
                      {relatedCourse.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-2">
                      {relatedCourse.desc}
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectCourse(relatedCourse)}
                    className="mt-4 py-2 px-3 rounded-xl text-xs font-bold bg-[#2254C4] hover:bg-[#1b439c] text-white transition-colors flex items-center justify-center gap-1.5 w-full"
                  >
                    <span>View Course</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* 2. Related Virtual Lab */}
              {relatedLab && (
                <div className="bg-[#071328] rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                      <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" /> 2. Practice (Virtual Lab)
                    </div>
                    <div className="text-sm font-extrabold text-white line-clamp-2 mb-1.5">
                      {relatedLab.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-2">
                      {relatedLab.desc}
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenLab(relatedLab)}
                    className="mt-4 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-colors flex items-center justify-center gap-1.5 w-full shadow-xs"
                  >
                    <span>Launch Virtual Lab</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* 3. GitHub Project */}
              <div className="bg-[#071328] rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                    <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" /> 3. Build &amp; Fork (GitHub)
                  </div>
                  <div className="text-sm font-extrabold text-white line-clamp-2 mb-1.5">
                    Open-Source Repository
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-2">
                    Access complete source code, test suites, and reproduction scripts for this phase.
                  </div>
                </div>
                <a
                  href={currentStage.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 py-2 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center gap-1.5 w-full"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Open on GitHub &rarr;</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
