import { motion } from 'framer-motion'
import { Award, CheckCircle2, Lock, Sparkles } from 'lucide-react'
import { DEVELOPER_ACHIEVEMENTS, AchievementBadge } from '../lib/courseData'

export default function DeveloperAchievements() {
  const unlockedCount = DEVELOPER_ACHIEVEMENTS.filter(a => a.unlocked).length

  return (
    <section id="achievements" className="section relative bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-2.5">
              <Award className="w-3.5 h-3.5" /> Silicon Engineering Badges
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Developer Achievements
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl">
              Earn verified milestone badges as you complete virtual labs, synthesize RTL projects, and contribute to open-source semiconductor silicon.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shrink-0">
            <span className="text-xs font-bold text-slate-600">Milestones Unlocked:</span>
            <span className="text-base font-extrabold font-mono text-[#2254C4]">
              {unlockedCount} / {DEVELOPER_ACHIEVEMENTS.length}
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEVELOPER_ACHIEVEMENTS.map((badge: AchievementBadge, idx: number) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.35 }}
              className={`p-5 rounded-3xl border transition-all duration-200 flex items-start gap-4 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-white via-amber-50/20 to-blue-50/20 border-amber-200/80 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className="text-3xl shrink-0 p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                {badge.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="font-extrabold text-sm text-[#0f172a] truncate">
                    {badge.title}
                  </h3>
                  {badge.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-500 leading-snug mb-2 line-clamp-2">
                  {badge.desc}
                </p>

                <span className="font-mono text-[10.5px] font-bold text-slate-400">
                  {badge.unlocked ? 'UNLOCKED' : `PROGRESS: ${badge.progress}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
