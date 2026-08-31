import { profile } from '../data/profile'

export default function Experience() {
  const { experience } = profile
  return (
    <section className="section experience" id="experience">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Built in real delivery environments.</h2>
      </div>
      <article className="experience-card">
        <div className="experience-topline">
          <div><span>{experience.company}</span><h3>{experience.role}</h3></div>
          <span>{experience.period}</span>
        </div>
        <p className="experience-summary">{experience.summary}</p>
        <ul>
          {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <a href={profile.resume} target="_blank" rel="noreferrer">View complete résumé ↗</a>
      </article>
    </section>
  )
}
