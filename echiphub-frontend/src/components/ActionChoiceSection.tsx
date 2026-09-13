import { motion } from 'framer-motion'
import { BookOpen, Play, Rocket, GitBranch, Calendar, ArrowRight, Sparkles } from 'lucide-react'

interface ActionChoiceSectionProps {
  onNavigate: (sectionId: string) => void
}

const ACTION_CARDS = [
  {
    id: 'courses',
    title: 'Learn',
    subtitle: 'Explore courses & structured learning',
    icon: BookOpen,
    emoji: '💻',
    color: 'from-blue-600 to-indigo-700',
    accent: 'bg-blue-50 text-[#2254C4] border-blue-100',
    actionText: 'Explore Courses'
  },
  {
    id: 'labs',
    title: 'Practice',
    subtitle: 'Open virtual semiconductor labs',
    icon: Play,
    emoji: '🧪',
    color: 'from-cyan-500 to-blue-600',
    accent: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    actionText: 'Enter Cloud Labs'
  },
  {
    id: 'projects',
    title: 'Build',
    subtitle: 'Work on real chip-design projects',
    icon: Rocket,
    emoji: '🚀',
    color: 'from-purple-600 to-blue-700',
    accent: 'bg-purple-50 text-purple-700 border-purple-100',
    actionText: 'Browse Projects'
  },
  {
    id: 'github',
    title: 'Contribute',
    subtitle: 'Explore GitHub repositories & code',
    icon: GitBranch,
    emoji: '🐙',
    color: 'from-slate-800 to-slate-950',
    accent: 'bg-slate-100 text-slate-800 border-slate-200',
    actionText: 'Open GitHub Hub'
  },
  {
    id: 'workshops',
    title: 'Join a Workshop',
    subtitle: 'Explore live and upcoming workshops',
    icon: Calendar,
    emoji: '🎓',
    color: 'from-amber-500 to-orange-600',
    accent: 'bg-amber-50 text-amber-800 border-amber-100',
    actionText: 'View Workshops'
  },
]

export default function ActionChoiceSection({ onNavigate }: ActionChoiceSectionProps) {
  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Fast-Track Discovery
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            What do you want to do?
          </h2>
          <p className="mt-1.5 text-slate-500 text-sm">
            Choose your path and jump directly into hands-on semiconductor resources.
          </p>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ACTION_CARDS.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.button
                key={card.id}
                onClick={() => onNavigate(card.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="group relative flex flex-col justify-between p-5 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#2254C4]/40 shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{card.emoji}</span>
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border ${card.accent} transition-transform group-hover:scale-110`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0f172a] group-hover:text-[#2254C4] transition-colors tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mt-1 mb-4">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#2254C4]">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
