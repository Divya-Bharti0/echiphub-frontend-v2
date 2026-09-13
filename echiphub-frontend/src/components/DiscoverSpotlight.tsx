import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Flame, BookOpen, Play, FolderGit2, Calendar } from 'lucide-react'
import { SPOTLIGHT_ITEMS, SpotlightItem } from '../lib/courseData'

const ICON_MAP = {
  'Trending Project': Flame,
  'Popular Course': BookOpen,
  'New Lab': Play,
  'Recently Updated Repo': FolderGit2,
  'Upcoming Workshop': Calendar,
}

const COLOR_MAP = {
  'Trending Project': 'bg-amber-50 text-amber-700 border-amber-200',
  'Popular Course': 'bg-blue-50 text-blue-700 border-blue-200',
  'New Lab': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Recently Updated Repo': 'bg-slate-100 text-slate-800 border-slate-200',
  'Upcoming Workshop': 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function DiscoverSpotlight() {
  return (
    <section className="section relative bg-[#f8fafc] border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Feeds
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Discover Something New
            </h2>
            <p className="mt-1 text-slate-500 text-sm">
              Highlighted silicon releases, trending repositories, and upcoming bootcamps.
            </p>
          </div>
        </div>

        {/* 5 Spotlight Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SPOTLIGHT_ITEMS.map((item: SpotlightItem, index: number) => {
            const Icon = ICON_MAP[item.type] || Sparkles
            const badgeStyle = COLOR_MAP[item.type] || 'bg-slate-100 text-slate-700 border-slate-200'

            return (
              <motion.a
                key={item.title}
                href={item.targetHash}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono border ${badgeStyle}`}>
                      {item.tag}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#2254C4] transition-colors" />
                  </div>

                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {item.type}
                  </div>

                  <h3 className="font-extrabold text-sm text-[#0f172a] group-hover:text-[#2254C4] transition-colors leading-snug line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-[#2254C4]">
                  <span>Explore &rarr;</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
