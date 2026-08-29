import { profile } from '../data/profile'

const deployment = [
  'Cloudflare (DNS · CDN · SSL)',
  'EC2 · nginx reverse proxy',
  'Portfolio / NeoPick / AgentSaul / AI Assistant',
  'PostgreSQL · Redis (Docker)',
]

function HorizontalFlow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          {i > 0 && <span className="mx-2 text-slate-400 dark:text-slate-500">→</span>}
          <div className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-center text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            {step}
          </div>
        </div>
      ))}
    </div>
  )
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          {i > 0 && <span className="text-xs leading-none text-slate-400 dark:text-slate-500">↓</span>}
          <div className="mt-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-center text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
            {step}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Architecture() {
  return (
    <section id="architecture" className="border-t border-slate-200 py-20 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Architecture
        </h2>

        <div className="mt-8 rounded-xl border border-slate-200 p-6 dark:border-slate-800">
          <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Deployment — one EC2 behind Cloudflare
          </h3>
          <div className="mt-5">
            <HorizontalFlow steps={deployment} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {profile.projects.map((project) => (
            <div key={project.name} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
              <p className="mt-1 font-mono text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {project.architecture}
              </p>
              <div className="mt-4">
                <Flow steps={project.diagram} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
