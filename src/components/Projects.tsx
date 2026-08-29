import { profile } from '../data/profile'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="border-t border-slate-200 py-20 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Projects</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
