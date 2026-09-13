import { motion } from 'framer-motion'
import { Wrench, BookOpen, Play, FolderGit2, Terminal, ArrowRight, Sparkles, ExternalLink } from 'lucide-react'
import { EDA_TOOLS, EDATool } from '../lib/courseData'

interface EDAToolsExplorerProps {
  onNavigateToCourses?: () => void
  onNavigateToLabs?: () => void
}

export default function EDAToolsExplorer({ onNavigateToCourses, onNavigateToLabs }: EDAToolsExplorerProps) {
  return (
    <section id="tools" className="section relative bg-[#f8fafc] border-b border-[#e2e8f0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300 mb-2.5">
            <Wrench className="w-3.5 h-3.5" /> Silicon Toolchains
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            EDA Tools Directory
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            The core open-source electronic design automation engines powering eChipHub courses, labs, and chip tape-outs.
          </p>
        </div>

        {/* 8 EDA Tool Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EDA_TOOLS.map((tool: EDATool, index: number) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2254C4] font-mono font-bold flex items-center justify-center text-sm">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2254C4] transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {tool.desc}
                </p>

                {/* "Used in:" Stats Box (Section 35) */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Used in:
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] font-bold text-slate-700">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#2254C4]" /> {tool.coursesCount} Courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3 text-cyan-600 fill-current" /> {tool.labsCount} Labs
                    </span>
                    <span className="flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-purple-600" /> {tool.projectsCount} Projects
                    </span>
                  </div>
                </div>

                {/* Command Preview */}
                <div className="p-2 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[10px] truncate mb-4 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 shrink-0 text-cyan-400" />
                  <span className="truncate">$ {tool.primaryCommand}</span>
                </div>
              </div>

              {/* Action Button: Explore -> */}
              <a
                href="#courses"
                onClick={onNavigateToCourses}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#2254C4] text-slate-800 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Explore {tool.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
