import { motion } from 'framer-motion'
import { MessageSquare, Users, AlertCircle, FolderGit2, Calendar, Sparkles, ExternalLink, ArrowRight } from 'lucide-react'

const COMMUNITY_CARDS = [
  {
    title: 'GitHub Discussions',
    count: '240+ Topics',
    desc: 'Q&A on Verilog simulation, OpenLane config, and timing debug.',
    icon: MessageSquare,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    href: 'https://community.echiphub.in/'
  },
  {
    title: 'Active Contributors',
    count: '65+ Engineers',
    desc: 'Semiconductor researchers, faculty, and industry mentors.',
    icon: Users,
    color: 'text-purple-600 bg-purple-50 border-purple-100',
    href: 'https://github.com/echiphub'
  },
  {
    title: 'Open Issues & PRs',
    count: '18 Active',
    desc: 'Good first issues for beginners to contribute to silicon IP.',
    icon: AlertCircle,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    href: 'https://github.com/echiphub'
  },
  {
    title: 'Community Events',
    count: 'Monthly Meetups',
    desc: 'Live tape-out retrospectives, EDA tool demos, and hackathons.',
    icon: Calendar,
    color: 'text-amber-600 bg-amber-50 border-amber-100',
    href: 'https://community.echiphub.in/'
  }
]

export default function CommunitySection() {
  return (
    <section id="community" className="section relative bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0d234d] via-[#14315f] to-[#091a3e] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-10">
          {/* Subtle PCB grid background */}
          <div className="absolute inset-0 pcb-bg opacity-10 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 80% 20%, rgba(41,171,226,0.18) 0%, transparent 60%)'
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-cyan-200 border border-white/15 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Open-Source Semiconductor Collective
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Join the eChipHub Community
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect with chip designers, academic researchers, and open-source EDA developers across India and worldwide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://community.echiphub.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine px-6 py-3.5 rounded-2xl font-extrabold text-sm text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-4 h-4 text-[#2254C4]" />
              </a>

              <a
                href="https://github.com/echiphub"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>GitHub Org</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Community Pillar Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMMUNITY_CARDS.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="group p-5 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                      {card.count}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#0f172a] group-hover:text-[#2254C4] transition-colors mb-1">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-bold text-[#2254C4]">
                  <span>Join Discussion</span>
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
