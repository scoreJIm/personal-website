import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Architecture from './components/Architecture'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Architecture />
        <Contact />
      </main>
      <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Wei Wei</span>
          <a
            href="https://github.com/scoreJIm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            github.com/scoreJIm
          </a>
        </div>
      </footer>
    </div>
  )
}
