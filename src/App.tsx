import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="site-shell">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Wei Wei</span>
        <span>Designed around real work, not a template.</span>
      </footer>
    </div>
  )
}
