import { profile } from '../data/profile'

export default function About() {
  return (
    <section className="section services" id="services">
      <div className="section-heading">
        <p className="eyebrow">What I bring</p>
        <h2>Product judgement.<br />Engineering depth.</h2>
        <p>I work across the line where a product decision becomes a system decision.</p>
      </div>
      <div className="service-list">
        {profile.services.map((service, index) => (
          <article className="service-row" key={service.title}>
            <span className="service-index">0{index + 1}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </div>
            <p className="service-fit">{service.fit}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
