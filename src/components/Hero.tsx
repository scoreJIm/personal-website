import { profile } from '../data/profile'

export default function Hero() {
  const { name, title, intro, coreSkills, contact } = profile

  return (
    <section id="top" className="px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400">Hi, my name is</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
          {name}
        </h1>
        <h2 className="mt-3 text-xl font-medium text-slate-700 dark:text-slate-300 sm:text-2xl">{title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{intro}</p>
        <p className="mt-4 font-mono text-sm text-slate-500 dark:text-slate-400">{contact.location}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {coreSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            View Projects
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100"
          >
            GitHub
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
