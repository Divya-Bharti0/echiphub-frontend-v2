import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Layers, FolderGit2, Sparkles, Cpu } from 'lucide-react'
import HeroChip3D from './HeroChip3D'

interface HeroProps {
  onExploreLearning?: () => void
  onExploreProjects?: () => void
}

const FLOW_STAGES = [
  { id: 'rtl', label: 'RTL', name: 'RTL Design', tool: 'Verilog / SystemVerilog', desc: 'Hardware logic specification & modeling' },
  { id: 'sim', label: 'Simulation', name: 'Verification', tool: 'Icarus & GTKWave', desc: 'Functional testbenches & SVA coverage' },
  { id: 'synth', label: 'Synthesis', name: 'Logic Synthesis', tool: 'Yosys & ABC', desc: 'Gate-level translation & optimization' },
  { id: 'pd', label: 'Physical Design', name: 'Floorplan & P&R', tool: 'OpenLane & OpenROAD', desc: 'Placement, CTS, routing & DRC checks' },
  { id: 'gdsii', label: 'GDSII', name: 'Silicon Sign-off', tool: 'Magic & KLayout', desc: 'Mask stream ready for foundry tape-out' },
]

export const Hero = memo(function Hero({ onExploreLearning, onExploreProjects }: HeroProps) {
  const [activeStage, setActiveStage] = useState(FLOW_STAGES[0])

  return (
    <section
      aria-label="eChipHub Semiconductor Learning Platform"
      className="relative w-full max-w-full bg-gradient-to-b from-white via-[#f4f8fe] to-[#ecf3fc] border-b border-[#e2e8f0] overflow-hidden py-10 sm:py-14 lg:py-16"
    >
      {/* Background circuits pattern */}
      <div className="absolute inset-0 pcb-bg opacity-35 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 65% 30%, rgba(41, 171, 226, 0.12) 0%, rgba(34, 84, 196, 0.04) 50%, transparent 80%)',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column — Core Headline, Subtitle & Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#cfe2f8] shadow-xs self-start mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold text-[#2254C4] tracking-wide uppercase">
                Interactive Learning • Open-Source • Virtual Labs
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0f172a] tracking-tight leading-[1.12] mb-4"
            >
              Build Your{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2254C4 0%, #29abe2 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Chip Design Journey
              </span>
            </motion.h1>

            {/* Short Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mb-7 font-medium"
            >
              Learn semiconductor design, practice in virtual labs and build with open-source projects.
            </motion.p>

            {/* Buttons: Explore Learning, Explore Projects, Open GitHub */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
            >
              <a
                href="#courses"
                onClick={e => {
                  if (onExploreLearning) {
                    e.preventDefault()
                    onExploreLearning()
                  }
                }}
                className="btn-shine px-6 py-3 rounded-2xl font-extrabold text-sm text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #2254C4 0%, #29abe2 100%)' }}
              >
                <span>Explore Learning</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                onClick={e => {
                  if (onExploreProjects) {
                    e.preventDefault()
                    onExploreProjects()
                  }
                }}
                className="px-5 py-3 rounded-2xl font-bold text-sm text-[#1e293b] bg-white hover:bg-slate-50 border border-[#cfe0f4] shadow-xs transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#2254C4]" />
                <span>Explore Projects</span>
              </a>

              <a
                href="https://github.com/echiphub"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl font-bold text-sm text-white bg-[#0f172a] hover:bg-[#1e293b] shadow-md transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Open GitHub</span>
              </a>
            </motion.div>

            {/* Interactive EDA Flow Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5 max-w-2xl"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-[#2254C4]">
                  <Sparkles className="w-3.5 h-3.5" /> Interactive ASIC Flow
                </span>
                <span>Click to inspect stage</span>
              </div>

              {/* Stage buttons */}
              <div className="grid grid-cols-5 gap-1.5">
                {FLOW_STAGES.map((st) => {
                  const isCur = activeStage.id === st.id
                  return (
                    <button
                      key={st.id}
                      onClick={() => setActiveStage(st)}
                      onMouseEnter={() => setActiveStage(st)}
                      className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
                        isCur
                          ? 'bg-gradient-to-r from-[#2254C4] to-[#29abe2] text-white shadow-xs font-bold scale-[1.03]'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/70'
                      }`}
                    >
                      <div className="text-[10px] opacity-75 font-mono truncate">{st.label}</div>
                    </button>
                  )
                })}
              </div>

              {/* Active Stage Tooltip Info */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{activeStage.name}</span>
                  <span className="font-mono text-[11px] text-[#2254C4] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {activeStage.tool}
                  </span>
                </div>
                <span className="text-slate-500 text-[11px] hidden sm:inline truncate max-w-xs">
                  {activeStage.desc}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Professional Semiconductor Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 via-white/50 to-blue-50/40 border border-[#cbe0f8] shadow-[0_20px_50px_rgba(34,84,196,0.12)] backdrop-blur-md overflow-hidden flex items-center justify-center">
                <HeroChip3D />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-2 text-[11px] font-mono font-bold text-slate-800 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                  <span>{activeStage.name.toUpperCase()} ACTIVE</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-md flex items-center gap-2 text-[11px] font-mono font-bold text-cyan-300 pointer-events-none">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SkyWater 130nm PDK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Hero
