import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('eChipHub UI error:', error, info)
  }

  handleReload = () => window.location.reload()

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6f8fc] px-6 py-16 text-center">
        <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">⚡</div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2254C4]">eChipHub</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">This page needs a quick refresh</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">A component could not load correctly. Your learning data is not affected. Please refresh and try again.</p>
          <button type="button" onClick={this.handleReload} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2254C4] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#1d49ad]">Refresh page</button>
        </section>
      </main>
    )
  }
}
