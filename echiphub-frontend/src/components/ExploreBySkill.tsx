import { motion } from 'framer-motion'
import { CircuitBoard, Gauge, Cpu, Layers3, Clock, Activity, Wrench, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { SKILL_ITEMS, SkillItem, CourseCategory, CourseLevel } from '../lib/courseData'

interface ExploreBySkillProps {
  onSelectSkill: (category: CourseCategory) => void
  onSelectLevel: (level: CourseLevel) => void
}

const ICON_MAP: Record<string, React.ElementType> = {
  CircuitBoard,
  Gauge,
  Cpu,
  Layers3,
  Clock,
  Activity,
  Wrench,
  ShieldCheck,
  Sparkles,
}

const LEVEL_CARDS = [
  {
    level: 'Beginner' as CourseLevel,
    title: 'Beginner',
    dot: 'bg-emerald-500',
    border: 'hover:border-emerald-300',
    desc: 'Start with digital logic fundamentals, basic Verilog syntax, and simple logic simulation testbenches.',
    tag: 'Foundation Track',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    level: 'Intermediate' as CourseLevel,
    title: 'Intermediate',
    dot: 'bg-amber-500',
    border: 'hover:border-amber-300',
    desc: 'Build and verify real designs, write SystemVerilog assertions, and assemble pipelined RISC-V CPU cores.',
    tag: 'Design & Verification',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    level: 'Advanced' as CourseLevel,
    title: 'Advanced',
    dot: 'bg-rose-500',
    border: 'hover:border-rose-300',
    desc: 'Work with ASIC physical design, OpenLane automation, multi-corner STA timing sign-off, and tape-out DRC.',
    tag: 'Physical Design & Tape-out',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
  },
]

export default function ExploreBySkill({ onSelectSkill, onSelectLevel }: ExploreBySkillProps) {
  return (
    <section className="section relative bg-gradient-to-b from-[#f8fafc] to-white border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        {/* ── 1. Explore By Skill ── */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" /> Skill-Based Pathways
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              What do you want to learn?
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              Click any semiconductor domain to immediately filter all relevant courses, labs, and projects.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-3">
            {SKILL_ITEMS.map((skill: SkillItem, index: number) => {
              const Icon = ICON_MAP[skill.iconName] || Cpu
              return (
                <motion.button
                  key={skill.id}
                  onClick={() => onSelectSkill(skill.category)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="group p-4 rounded-2xl bg-white hover:bg-gradient-to-b hover:from-white hover:to-blue-50/60 border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center justify-between cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-[#2254C4] text-[#2254C4] group-hover:text-white flex items-center justify-center transition-colors mb-2.5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-xs text-slate-900 group-hover:text-[#2254C4] transition-colors leading-tight">
                    {skill.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {skill.desc}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ── 2. Choose Your Level ── */}
        <div className="pt-6 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" /> Experience Level
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Choose Your Level
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              Tailor the curriculum and labs to your current semiconductor background.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {LEVEL_CARDS.map((lvl, index) => (
              <motion.button
                key={lvl.level}
                onClick={() => onSelectLevel(lvl.level)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className={`group p-6 rounded-3xl bg-white border border-slate-200 ${lvl.border} shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer flex flex-col justify-between hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${lvl.dot}`} />
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#2254C4] transition-colors">
                        {lvl.title}
                      </h3>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${lvl.badgeBg}`}>
                      {lvl.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {lvl.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2254C4]">
                  <span>Filter for {lvl.title} →</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
