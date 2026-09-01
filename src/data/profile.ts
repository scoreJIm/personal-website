export interface Project {
  name: string
  label: string
  thesis: string
  description: string
  proof: string[]
  tech: string[]
  architecture: string
  diagram: string[]
  github: string
  demo: string
  caseStudy?: string
}

export const profile = {
  name: 'Wei Wei',
  nickname: 'Jimmy',
  role: 'Software engineer · Backend & AI products',
  headline: 'I build the systems behind useful products.',
  intro:
    'Java backend engineering, AI application development, and the product judgement to take an idea from rough brief to working software.',
  availability: 'Open to Germany / Europe roles and selected remote contracts',
  location: 'Nanjing, China · Ready to relocate',
  email: 'vvlovqq@gmail.com',
  github: 'https://github.com/scoreJIm',
  linkedin: 'https://linkedin.com/in/weiweicareer',
  resume: '/Wei-Wei-Resume.pdf',
  proof: [
    { value: '3.5 yrs', label: 'commercial engineering experience' },
    { value: '8-person', label: 'delivery team coordinated' },
    { value: '3', label: 'products built end to end' },
  ],
  services: [
    {
      title: 'Backend systems',
      copy: 'Java and Spring services, API design, PostgreSQL, Redis, messaging, testing, and deployment-ready foundations.',
      fit: 'Best for platform work, integrations, and systems that need clean domain boundaries.',
    },
    {
      title: 'AI product engineering',
      copy: 'LLM applications with tool calling, RAG, streaming interfaces, evaluation, and practical failure handling.',
      fit: 'Best for turning an AI proof of concept into a product people can actually use.',
    },
    {
      title: 'Zero-to-one delivery',
      copy: 'I connect product discovery, system design, implementation, and documentation instead of treating them as separate hand-offs.',
      fit: 'Best for founders and teams with a clear problem but an unfinished technical path.',
    },
  ],
  skillGroups: [
    { group: 'Backend', skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kafka'] },
    { group: 'AI applications', skills: ['Spring AI', 'RAG', 'Tool calling', 'PgVector'] },
    { group: 'Delivery', skills: ['Docker', 'AWS', 'GitHub Actions', 'Technical leadership'] },
  ],
  experience: {
    company: 'iSoftStone Information Technology',
    role: 'Backend Engineer · Project Lead (client delivery)',
    period: '2023 — present',
    summary:
      'Project Lead in a client delivery team at a technology services company, coordinating eight backend engineers while our team owns implementation and delivery.',
    highlights: [
      'Translated client requirements into implementation work for road, transit, and facility-data platforms.',
      'Supported hiring, ran fortnightly team meetings and weekly reporting, and onboarded new engineers into active project work.',
      'Designed multi-source ingestion, data-quality plugins, and high-volume PostgreSQL processing for million-record datasets.',
    ],
  },
  projects: [
    {
      name: 'NeoPick',
      label: 'Product + full-stack engineering',
      thesis: 'Make one-to-one guitar lessons flexible enough to fit real life.',
      description:
        'NeoPick began with user interviews: students found music schools expensive, rigid, and inconvenient. The product connects learners with independent guitar teachers around time, place, price, and teaching needs.',
      proof: ['User research & personas', 'Teacher discovery', 'Booking state machine', 'Real-time chat'],
      architecture: 'Product discovery · Marketplace domain · Booking workflow',
      diagram: ['Discover a teacher', 'Choose time and place', 'Book a lesson', 'Learn and review'],
      tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Redis', 'Vue'],
      github: 'https://github.com/scoreJIm/NeoPick',
      demo: 'https://neo.jimmyweidev.com',
      caseStudy: 'https://docs.google.com/document/d/1DgbCZrAgMl0y96YErauFIqbSMGr_9VPvwOjcKrBAnTE/edit?tab=t.0',
    },
    {
      name: 'AgentSaul',
      label: 'Java AI application',
      thesis: 'Give an AI agent an outcome—and watch how it gets there.',
      description:
        'A Spring AI execution workspace that exposes tool selection, results, conversation memory, and streaming responses. Its interface makes agent behaviour inspectable instead of hiding it behind a chat bubble.',
      proof: ['Visible tool execution', 'Structured output', 'Conversation memory', 'SSE streaming'],
      architecture: 'Request · Agent decision · Tool execution · Streaming result',
      diagram: ['Message', 'Agent decision', 'Tool execution', 'Streaming response'],
      tech: ['Spring AI', 'Qwen', 'Java', 'PostgreSQL', 'Redis'],
      github: 'https://github.com/scoreJIm/AgentSaul',
      demo: 'https://agent.jimmyweidev.com',
    },
    {
      name: 'TRACE Knowledge Assistant',
      label: 'Python AI product',
      thesis: 'Ask questions of your own documents and see what the answer used.',
      description:
        'A private document workspace built around an explicit retrieval pipeline: ingest, chunk, embed, retrieve, and stream a grounded answer with the source passages shown beside it.',
      proof: ['Document ingestion', 'Evidence rail', 'Grounded answers', 'Offline evaluation'],
      architecture: 'Ingest · Chunk · Embed · Retrieve · Answer',
      diagram: ['Upload', 'Index', 'Retrieve', 'Grounded answer'],
      tech: ['FastAPI', 'Python', 'pgvector', 'React', 'Docker'],
      github: 'https://github.com/scoreJIm/ai-assistant',
      demo: 'https://rag.jimmyweidev.com',
    },
  ] as Project[],
}
