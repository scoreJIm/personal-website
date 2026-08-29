import { profile } from '../data/profile'

export default function Contact() {
  const { contact } = profile

  const items = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    {
      label: 'Phone / WhatsApp',
      value: contact.phone,
      href: `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`,
    },
    { label: 'GitHub', value: 'github.com/scoreJIm', href: contact.github },
    { label: 'LinkedIn', value: 'linkedin.com/in/weiweicareer', href: contact.linkedin },
  ]

  return (
    <section id="contact" className="border-t border-slate-200 py-20 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Contact</h2>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">Get in touch</h3>
        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
          Open to new opportunities and freelance projects.
        </p>
        <p className="mt-2 font-mono text-sm text-slate-500 dark:text-slate-400">{contact.location}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group rounded-xl border border-slate-200 p-5 transition-colors hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-indigo-600 dark:hover:bg-slate-900"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 truncate text-sm font-medium text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
                {item.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
