import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <p className="eyebrow">Next step</p>
      <h2>Have a role, a product,<br />or a difficult system?</h2>
      <p>Send the context. I’ll reply with questions, constraints, and a practical next move.</p>
      <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} ↗</a>
      <div className="contact-links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
      </div>
    </section>
  )
}
