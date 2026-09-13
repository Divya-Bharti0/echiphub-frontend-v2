import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, RefreshCw, Terminal, CheckCircle2, Code2, ExternalLink, Cpu } from 'lucide-react'
import { VirtualLab } from '../lib/courseData'

interface LabSimulatorModalProps {
  lab: VirtualLab | null
  open: boolean
  onClose: () => void
}

export default function LabSimulatorModal({ lab, open, onClose }: LabSimulatorModalProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'logs' | 'waveform'>('logs')
  const [completed, setCompleted] = useState(false)

  if (!open || !lab) return null

  const handleRun = () => {
    setIsRunning(true)
    setCompleted(false)
    setActiveTab('logs')
    setTimeout(() => {
      setIsRunning(false)
      setCompleted(true)
    }, 1600)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0b1329] border border-cyan-500/25 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-white"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#070e20]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {lab.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-slate-300">
                  {lab.difficulty}
                </span>
                <span className="text-xs text-slate-400">
                  Est. {lab.estimatedTime}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                {lab.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Running EDA Flow...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Execute Simulation
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader & Tabs */}
          <div className="px-6 py-2.5 bg-[#0e1935] border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                  activeTab === 'logs'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Terminal Logs
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                  activeTab === 'code'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" /> Source / Config
              </button>
              {lab.hasWaveform && (
                <button
                  onClick={() => setActiveTab('waveform')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                    activeTab === 'waveform'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" /> Waveform Inspection
                </button>
              )}
            </div>

            <span className="text-slate-400 hidden sm:inline truncate max-w-xs">
              $ {lab.commandPreview}
            </span>
          </div>

          {/* Workspace Body */}
          <div className="p-6 flex-1 overflow-y-auto font-mono text-xs sm:text-sm">
            {activeTab === 'logs' && (
              <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="text-cyan-400 pb-2 border-b border-white/10 flex items-center justify-between">
                  <span>[CHIPCRAFT VIRTUAL KERNEL v2.4.0 — CLOUD RUNNER]</span>
                  <span className="text-[11px] text-slate-500">Target PDK: SkyWater 130nm</span>
                </div>
                <div className="text-slate-400">$ {lab.commandPreview}</div>
                {lab.sampleLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`leading-relaxed ${
                      log.includes('PASS') || log.includes('passed') || log.includes('clean') || log.includes('MET')
                        ? 'text-emerald-400'
                        : log.includes('STAGE') || log.includes('AC_ANALYSIS')
                        ? 'text-cyan-300 font-semibold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {completed && (
                  <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Experiment execution completed successfully. Zero errors recorded.</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 overflow-x-auto text-slate-200 leading-relaxed whitespace-pre font-mono">
                {lab.defaultCode || '// No code snippet configured for this lab.'}
              </div>
            )}

            {activeTab === 'waveform' && (
              <div className="bg-black/50 p-5 rounded-xl border border-white/5 text-center space-y-4">
                <div className="text-cyan-300 text-xs uppercase tracking-widest font-bold">
                  Digital Timing Waveform / Transient Scope
                </div>
                <div className="p-6 border border-cyan-500/20 rounded-lg bg-[#050b18] text-left space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                    <span>Signal Name</span>
                    <span>Timing Diagram (0ns — 500ns)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400">clk</span>
                      <span className="text-slate-500 font-mono tracking-widest">_|-|_|-|_|-|_|-|_|-|_|-|_|-|_|-|_|-|</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400">rst_n</span>
                      <span className="text-slate-500 font-mono tracking-widest">____|--------------------------------</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400">count[3:0]</span>
                      <span className="text-slate-400 font-mono tracking-wider">[0x0]--[0x1]--[0x2]--[0x3]--[0x4]--[0x5]</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  GTKWave compatible VCD trace buffer rendered. All clock edges and transitions verified.
                </p>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="p-4 sm:p-5 bg-[#070e20] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Technologies:</span>
              <div className="flex flex-wrap gap-1">
                {lab.technologies.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={lab.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
            >
              Lab Starter on GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
