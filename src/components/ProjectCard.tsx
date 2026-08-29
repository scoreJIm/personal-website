import type { Project } from '../data/profile'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-sm dark:border-slate-800">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
      <p className="mt-0.5 font-mono text-sm text-slate-500 dark:text-slate-400">{project.tagline}</p>

      <p className="mt-4 flex-1 leading-relaxed text-slate-600 dark:text-slate-400">{project.description}</p>

      <p className="mt-4 border-l-2 border-indigo-200 pl-3 font-mono text-xs leading-relaxed text-slate-500 dark:border-indigo-900 dark:text-slate-400">
        {project.architecture}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.diagram.length > 0 && (
        <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex flex-col items-center gap-1.5">
            {project.diagram.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                {i > 0 && <span className="text-xs leading-none text-slate-400 dark:text-slate-500">↓</span>}
                <div className="mt-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View on GitHub →
        </a>
        {project.caseStudy && (
          <a
            href={project.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Case Study ↗
          </a>
        )}
      </div>
    </article>
  )
}
