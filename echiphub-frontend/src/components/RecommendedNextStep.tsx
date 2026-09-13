import { motion } from 'framer-motion'
import { Play, Rocket, FolderGit2, BookOpen, ArrowRight, Sparkles } from 'lucide-react'

interface RecommendedNextStepProps {
  onNavigate: (sectionId: string) => void
}

const NEXT_STEPS = [
  {
    step: 'LEARNED THE CONCEPT?',
    title: 'Try the Virtual Lab',
    desc: 'Jump into browser-based simulation kernels with pre-configured SkyWater 130nm PDKs.',
    icon: Play,
    action: 'Open Labs',
    target: 'labs',
    bg: 'bg-cyan-50 border-cyan-100 text-cyan-800',
    btnBg: 'bg-cyan-600 hover:bg-cyan-700 text-white'
  },
  {
    step: 'PRACTICED THE LAB?',
    title: 'Build a Project',
    desc: 'Construct a synthesizable RISC-V CPU core, UART peripheral, or 8-bit SAR ADC.',
    icon: Rocket,
    action: 'Browse Projects',
    target: 'projects',
    bg: 'bg-purple-50 border-purple-100 text-purple-800',
    btnBg: 'bg-purple-600 hover:bg-purple-700 text-white'
  },
  {
    step: 'BUILT THE PROJECT?',
    title: 'View on GitHub',
    desc: 'Star, fork, and inspect the official open-source Verilog and OpenLane repository code.',
    icon: FolderGit2,
    action: 'Explore GitHub',
    target: 'github',
    bg: 'bg-slate-100 border-slate-200 text-slate-800',
    btnBg: 'bg-slate-900 hover:bg-slate-800 text-white'
  },
  {
    step: 'EXPLORED THE REPO?',
    title: 'Enroll in Courses',
    desc: 'Advance your skills with structured 6-8 week bootcamps delivered by chip mentors.',
    icon: BookOpen,
    action: 'Explore Courses',
    target: 'courses',
    bg: 'bg-blue-50 border-blue-100 text-[#2254C4]',
    btnBg: 'bg-[#2254C4] hover:bg-[#19429c] text-white'
  }
]

export default function RecommendedNextStep({ onNavigate }: RecommendedNextStepProps) {
  return (
    <section className="relative py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f8fafc] to-white border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Continuous Learning Loop
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            What&apos;s Next?
          </h2>
          <p className="mt-1 text-slate-500 text-sm">
            Move seamlessly between theory, cloud simulation, project building, and GitHub source code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NEXT_STEPS.map((ns, idx) => {
            const Icon = ns.icon
            return (
              <motion.div
                key={ns.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className={`p-6 rounded-3xl border ${ns.bg} flex flex-col justify-between`}
              >
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase opacity-75 mb-2">
                    {ns.step}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 shrink-0" />
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {ns.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {ns.desc}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(ns.target)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${ns.btnBg} cursor-pointer`}
                >
                  <span>{ns.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
