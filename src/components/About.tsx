import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="border-t border-slate-200 py-20 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">About</h2>
        <p className="mt-2 font-mono text-sm text-slate-400 dark:text-slate-500">I go by {profile.nickname}.</p>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">Education</h3>
              <ul className="mt-3 space-y-2.5">
                {profile.education.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">Languages</h3>
              <ul className="mt-3 space-y-2">
                {profile.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2 dark:border-slate-800"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300">{lang.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
