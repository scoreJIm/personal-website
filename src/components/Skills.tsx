import { profile } from '../data/profile'

export default function Skills() {
  return (
    <section id="skills" className="border-t border-slate-200 py-20 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Skills</h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skillGroups.map((group) => (
            <div key={group.group} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {group.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
