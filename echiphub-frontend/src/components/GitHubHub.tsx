import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FolderGit2, Star, GitFork, Users, Clock, ExternalLink } from 'lucide-react'
import { GITHUB_REPOS, GitHubCategory, GitHubRepo } from '../lib/courseData'

const REPO_TABS: { key: GitHubCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Repositories' },
  { key: 'featured', label: 'Featured' },
  { key: 'trending', label: 'Trending' },
  { key: 'recent', label: 'Recently Updated' },
  { key: 'beginner', label: 'Beginner Friendly' },
  { key: 'popular', label: 'Most Popular' },
]

export default function GitHubHub() {
  const [activeTab, setActiveTab] = useState<GitHubCategory | 'all'>('all')

  const filteredRepos = useMemo(() => {
    if (activeTab === 'all') return GITHUB_REPOS
    return GITHUB_REPOS.filter(r => r.category === activeTab)
  }, [activeTab])

  return (
    <section id="github" className="section relative bg-[#f8fafc] border-b border-[#e2e8f0] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300 mb-3">
              <FolderGit2 className="w-3.5 h-3.5" /> Official Organization Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              GitHub Repositories &amp; Source Code
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
              Browse, fork, and contribute to eChipHub&apos;s open-source semiconductor repositories, testbenches, and EDA automation scripts.
            </p>
          </div>

          <a
            href="https://github.com/echiphub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors shrink-0"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Follow @echiphub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {REPO_TABS.map(tab => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Repositories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo: GitHubRepo, index: number) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-[#2254C4] shrink-0" />
                    <h3 className="font-mono text-sm sm:text-[15px] font-bold text-[#0f172a] group-hover:text-[#2254C4] transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0 capitalize">
                    {repo.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {repo.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {repo.topics.map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded-md text-[10.5px] font-mono text-slate-600 bg-slate-50 border border-slate-200/60"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Repository Metrics Row */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-mono mb-4">
                  {/* Language */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: repo.languageColor }}
                    />
                    <span className="text-slate-700 font-semibold">{repo.language}</span>
                  </div>

                  {/* Stars, Forks, Issues */}
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Users className="w-3.5 h-3.5" /> {repo.contributors}
                    </span>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Updated {repo.lastUpdated}</span>
                  </div>

                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2254C4] hover:underline"
                  >
                    <span>GitHub &rarr;</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
