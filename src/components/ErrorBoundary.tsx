import { Component, type ErrorInfo, type ReactNode } from 'react'

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
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center dark:bg-slate-950">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              This site hit a snag.
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              I'll fix it when I get a chance. The code's on GitHub if you want a look.
            </p>
            <a
              href="https://github.com/scoreJIm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              github.com/scoreJIm →
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
