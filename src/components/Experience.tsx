import { profile } from '../data/profile'

export default function Experience() {
  return (
    <section id="experience" className="border-t border-slate-200 py-20 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Experience</h2>

        <div className="mt-8 space-y-6">
          {profile.experience.map((exp) => (
            <article
              key={exp.company}
              className="rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-sm dark:border-slate-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{exp.company}</h3>
                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">{exp.duration}</span>
              </div>
              <p className="mt-1 text-slate-700 dark:text-slate-300">{exp.role}</p>

              <ul className="mt-4 space-y-2.5">
                {exp.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>

              {exp.technologies.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
