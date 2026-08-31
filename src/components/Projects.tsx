import { profile } from '../data/profile'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section className="section work" id="work">
      <div className="section-heading work-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Three products.<br />Three different muscles.</h2>
        <p>Backend systems, Java AI, and Python RAG—each project has one job in the portfolio.</p>
      </div>
      <div className="project-list">
        {profile.projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
