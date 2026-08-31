import type { Project } from '../data/profile'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project project-${index + 1}`}>
      <div className="project-meta">
        <span>Case 0{index + 1}</span>
        <span>{project.label}</span>
      </div>
      <div className="project-title">
        <h3>{project.name}</h3>
        <p>{project.thesis}</p>
      </div>
      <p className="project-description">{project.description}</p>
      <ul className="project-proof">
        {project.proof.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="project-tech">
        {project.tech.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="project-links">
        <a href={project.demo} target="_blank" rel="noreferrer">Open live preview ↗</a>
        <a href={project.github} target="_blank" rel="noreferrer">Read the code ↗</a>
        {project.caseStudy && <a href={project.caseStudy} target="_blank" rel="noreferrer">Product case study ↗</a>}
      </div>
    </article>
  )
}
