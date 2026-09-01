import { useState } from 'react'
import { profile } from '../data/profile'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Selected work' },
  { href: '#stack', label: 'Stack' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-wrap">
      <nav className="nav-inner" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Wei Wei, home">
          WW<span>↗</span>
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
