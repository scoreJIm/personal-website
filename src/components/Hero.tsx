import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> {profile.availability}</p>
        <h1>{profile.headline}</h1>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">See selected work</a>
          <a className="button button-quiet" href={`mailto:${profile.email}`}>Start a conversation ↗</a>
        </div>
        <div className="identity-line">
          <span>{profile.name} / {profile.nickname}</span>
          <span>{profile.role}</span>
          <span>{profile.location}</span>
        </div>
      </div>
      <figure className="hero-portrait">
        <img src="/jimmy-stage.jpg" alt="Jimmy Wei playing electric guitar on stage" />
        <figcaption>
          <span>Engineer offstage</span>
          <span>Guitarist onstage</span>
        </figcaption>
      </figure>
      <div className="hero-proof" aria-label="Professional highlights">
        {profile.proof.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
