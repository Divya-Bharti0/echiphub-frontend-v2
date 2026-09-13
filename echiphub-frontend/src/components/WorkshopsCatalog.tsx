import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Sparkles, Clock, CheckCircle2 } from 'lucide-react'
import { WORKSHOPS, WorkshopItem, COURSE_URL } from '../lib/courseData'

export default function WorkshopsCatalog() {
  const getStatusBadge = (status: WorkshopItem['status']) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" /> LIVE NOW
          </span>
        )
      case 'UPCOMING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            UPCOMING
          </span>
        )
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> COMPLETED
          </span>
        )
    }
  }

  return (
    <section id="workshops" className="section relative bg-[#f8fafc] border-b border-[#e2e8f0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#2254C4] border border-blue-100 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Hands-On Bootcamps &amp; Masterclasses
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Semiconductor Workshops
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
              Live interactive and recorded technical sessions delivered by industry chip designers and EDA mentors.
            </p>
          </div>

          <a
            href={COURSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs transition-colors shrink-0"
          >
            <span>View All Schedules</span>
            <ArrowRight className="w-4 h-4 text-[#2254C4]" />
          </a>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKSHOPS.map((ws, index) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-40 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Status Overlay */}
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(ws.status)}
                  </div>

                  {/* Date Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/40 px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{ws.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {ws.technologies.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10.5px] font-mono font-bold bg-blue-50 text-[#2254C4] border border-blue-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base font-extrabold text-[#0f172a] group-hover:text-[#2254C4] transition-colors tracking-tight leading-snug line-clamp-2 mb-1.5 min-h-[44px]">
                    {ws.title}
                  </h3>

                  <div className="text-[11px] font-medium text-slate-500 mb-2 truncate">
                    Mentor: {ws.instructor}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {ws.desc}
                  </p>
                </div>
              </div>

              {/* Action Button (Section 36) */}
              <div className="p-5 pt-0">
                <a
                  href={ws.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-[#2254C4] text-slate-800 hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:bg-[#2254C4] group-hover:text-white"
                >
                  <span>
                    {ws.status === 'LIVE'
                      ? 'Register Now'
                      : ws.status === 'COMPLETED'
                      ? 'Watch / Resources'
                      : 'View Details'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

