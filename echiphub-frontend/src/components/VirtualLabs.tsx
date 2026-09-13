import { motion } from 'framer-motion'
import { Play, Sparkles, Terminal, ExternalLink, Wrench, Clock } from 'lucide-react'
import { VIRTUAL_LABS, VirtualLab, LabLiveStatus } from '../lib/courseData'

interface VirtualLabsProps {
  onOpenLab: (lab: VirtualLab) => void
}

const STATUS_INDICATOR: Record<LabLiveStatus, { label: string; dot: string; bg: string; text: string; border: string }> = {
  'available': {
    label: 'Available',
    dot: 'bg-emerald-400',
    bg: 'bg-emerald-950/60',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30'
  },
  'in-progress': {
    label: 'In Progress',
    dot: 'bg-amber-400 animate-pulse',
    bg: 'bg-amber-950/60',
    text: 'text-amber-300',
    border: 'border-amber-500/30'
  },
  'recently-updated': {
    label: 'Recently Updated',
    dot: 'bg-cyan-400',
    bg: 'bg-cyan-950/60',
    text: 'text-cyan-300',
    border: 'border-cyan-500/30'
  },
  'coming-soon': {
    label: 'Coming Soon',
    dot: 'bg-slate-400',
    bg: 'bg-slate-900/60',
    text: 'text-slate-400',
    border: 'border-slate-600/30'
  },
}

export default function VirtualLabs({ onOpenLab }: VirtualLabsProps) {
  const filteredLabs = VIRTUAL_LABS

  return (
    <section id="labs" className="section relative bg-[#071329] text-white overflow-hidden">
      {/* Semiconductor grid backdrop */}
      <div className="absolute inset-0 pcb-bg opacity-[0.08] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(34,84,196,0.18) 0%, rgba(6,182,212,0.06) 45%, transparent 75%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-[#38bdf8] border border-cyan-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Hands-On ChipCraft Virtual Labs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Virtual Laboratories
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Pre-configured cloud EDA environments with instant browser simulation, waveform trace inspection, and DRC sign-off.
            </p>
          </div>

          {/* Live Status Legend Strip (Section 28) */}
          <div className="flex items-center gap-2 flex-wrap bg-[#0c1e3d]/90 p-2.5 rounded-2xl border border-white/10 text-xs">
            <span className="flex items-center gap-1 text-emerald-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> In Progress
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-cyan-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Recently Updated
            </span>
          </div>
        </div>

        {/* Labs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab, index) => {
            const statusConfig = STATUS_INDICATOR[lab.liveStatus] || STATUS_INDICATOR.available

            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c1e3d]/80 backdrop-blur-md overflow-hidden hover:border-cyan-400/40 hover:bg-[#0f254c] shadow-lg hover:shadow-[0_16px_36px_rgba(0,0,0,0.4),0_0_24px_rgba(56,189,248,0.12)] transition-all duration-300"
              >
                <div>
                  {/* Visual Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={lab.image}
                      alt={lab.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e3d] via-transparent to-black/30" />

                    {/* Live Status Badge (Section 28) */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 shadow-xs ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                        {statusConfig.label}
                      </span>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-xs">
                        {lab.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-mono text-[11px] text-cyan-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {lab.estimatedTime}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-black/50 text-slate-300 border border-white/10">
                        {lab.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-200 transition-colors tracking-tight mb-2">
                      {lab.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
                      {lab.desc}
                    </p>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lab.technologies.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Tools Row (Section 27) */}
                    <div className="p-3 rounded-2xl bg-[#071328]/80 border border-white/5 space-y-1 text-xs mb-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-cyan-400" /> Tools
                      </div>
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-200 font-mono">
                        {lab.tools.map(tool => (
                          <span key={tool} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Command Line Preview */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-slate-400 flex items-center gap-2 overflow-hidden">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">$ {lab.commandPreview}</span>
                    </div>
                  </div>
                </div>

                {/* Action Footer: Start Lab -> */}
                <div className="p-6 pt-0 flex items-center gap-2.5">
                  <button
                    onClick={() => onOpenLab(lab)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all group-hover:brightness-110 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Lab &rarr;</span>
                  </button>

                  <a
                    href={lab.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${lab.title} source code`}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
