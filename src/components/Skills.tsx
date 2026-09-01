import { profile } from '../data/profile'

export default function Skills() {
  return (
    <section className="section stack" id="stack">
      <div className="section-heading stack-heading">
        <p className="eyebrow">Technical stack</p>
        <h2>A backend spine.<br />Extended by AI.</h2>
        <p>I choose technology around the product path: model the problem, expose the capability, then make it operable.</p>
      </div>

      <div className="stack-trace" aria-label="Technical capability layers">
        {profile.skillGroups.map((group, index) => (
          <article className="stack-layer" key={group.group}>
            <div className="stack-marker" aria-hidden="true">
              <span>0{index + 1}</span>
            </div>
            <div className="stack-purpose">
              <h3>{group.group}</h3>
              <p>{group.thesis}</p>
            </div>
            <ul className="stack-tools" aria-label={`${group.group} technologies`}>
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
            <p className="stack-evidence"><span>Used in</span>{group.evidence}</p>
          </article>
        ))}
        <div className="stack-output" aria-hidden="true">
          <span>↓</span>
          <p>Problem → system → working product</p>
        </div>
      </div>
    </section>
  )
}
