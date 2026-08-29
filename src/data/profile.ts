export interface Project {
  name: string
  tagline: string
  description: string
  tech: string[]
  architecture: string
  diagram: string[]
  github: string
  demo?: string
  caseStudy?: string
}

export interface ExperienceItem {
  company: string
  role: string
  duration: string
  responsibilities: string[]
  technologies: string[]
}

export interface SkillGroup {
  group: string
  skills: string[]
}

export interface Language {
  name: string
  level: string
}

export interface Profile {
  name: string
  nickname: string
  title: string
  intro: string
  coreSkills: string[]
  about: string[]
  education: string[]
  languages: Language[]
  experience: ExperienceItem[]
  skillGroups: SkillGroup[]
  projects: Project[]
  contact: {
    email: string
    phone: string
    github: string
    linkedin: string
    location: string
  }
}

export const profile: Profile = {
  name: 'Wei Wei',
  nickname: 'Jimmy',
  title: 'Backend Engineer',
  intro:
    "Most of my work is Java and Spring Boot — data platforms, Postgres, Redis. Lately I've been building LLM apps too.",
  coreSkills: [
    'Java',
    'Spring Boot',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS',
    'Python',
    'RAG',
  ],

  about: [
    'Backend engineer, nearly four years in. At iSoftStone I lead a team of eight building geospatial data platforms — road, transit, and facility data.',
    'Outside work I built NeoPick, AgentSaul, and the AI assistant.',
  ],

  education: [
    'B.Sc. Computer Science — Suzhou University (2016–2020)',
    'Degree listed in the German Anabin database (H+), qualifying for the EU Blue Card pathway.',
  ],

  languages: [
    { name: 'Chinese', level: 'Native (Mandarin)' },
    { name: 'English', level: 'C1 — Business fluent' },
    { name: 'German', level: 'A1 — working toward B1' },
  ],

  experience: [
    {
      company: 'iSoftStone Information Technology',
      role: 'Backend Engineer',
      duration: 'Mar 2023 – Present',
      technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'PostgreSQL', 'Redis', 'Kafka', 'AWS', 'Docker'],
      responsibilities: [
        'Led a backend team of eight engineers building geospatial data platforms. I own the system architecture, code review, technical hiring, and mentoring; as the primary technical contact on the delivery side, I have kept the top client-satisfaction rating on the account.',
        'Reworked the team’s development workflow and CI/CD pipeline, lifting per-engineer delivery velocity by 73% (Q2 2024 vs. Q1 2024 baseline). Recognized with the company’s Efficiency Improvement Award.',
        'Built three million-record geospatial data platforms from scratch (road, transit, and facility data) for a national infrastructure client — writing the technical specifications, designing the database schemas, and training the operations team.',
      ],
    },
  ],

  skillGroups: [
    { group: 'Languages', skills: ['Java', 'Python', 'SQL'] },
    {
      group: 'Backend',
      skills: ['Spring Boot', 'Spring Cloud', 'Spring AI', 'LangChain4j', 'MyBatis', 'Quartz'],
    },
    {
      group: 'Database',
      skills: ['PostgreSQL', 'PostGIS', 'MySQL', 'Redis', 'Elasticsearch'],
    },
    { group: 'Messaging', skills: ['Apache Kafka', 'RabbitMQ'] },
    { group: 'Cloud', skills: ['AWS', 'Docker', 'Kubernetes'] },
    {
      group: 'AI / LLM',
      skills: ['RAG', 'Function Calling', 'PgVector', 'Vector Search', 'Embeddings'],
    },
    {
      group: 'DevOps & Tools',
      skills: ['Git', 'Maven', 'GitHub Actions', 'Agile / Scrum'],
    },
  ],

  projects: [
    {
      name: 'NeoPick',
      tagline: 'Guitar lesson marketplace',
      description:
        'Two-sided platform connecting students with guitar teachers — search, booking, payment, reviews, and real-time chat in one marketplace loop.',
      tech: [
        'Java 21',
        'Spring Boot 3.3',
        'PostgreSQL',
        'Redis',
        'WebSocket',
        'JWT',
        'AWS',
        'Docker',
        'Flyway',
      ],
      architecture: 'Hexagonal (Ports & Adapters) · Domain-Driven Design · Booking state machine',
      diagram: [
        'Client',
        'REST + WebSocket API',
        'Booking · Review · Payment (use cases)',
        'PostgreSQL · Redis · AWS S3',
        'Alipay RSA2 · WeChat Pay V3',
      ],
      github: 'https://github.com/scoreJIm/NeoPick',
      caseStudy:
        'https://docs.google.com/document/d/1DgbCZrAgMl0y96YErauFIqbSMGr_9VPvwOjcKrBAnTE/edit?tab=t.0',
    },
    {
      name: 'AgentSaul',
      tagline: 'LLM chat app with tool calling',
      description:
        'A conversational app that combines an LLM with structured tool calling, multi-turn conversation memory, and SSE streaming.',
      tech: ['Spring Boot 3.4', 'Spring AI 1.0', 'Qwen3 (DashScope)', 'MyBatis', 'Redis'],
      architecture: 'Tool calling via @Tool + ToolCallback · Multi-turn memory · SSE streaming',
      diagram: [
        'User',
        'Chat API (SSE streaming)',
        'ChatClient + Function Calling (@Tool)',
        'Qwen3 (DashScope) · Structured Output · Memory',
        'PostgreSQL ChatMemory',
      ],
      github: 'https://github.com/scoreJIm/AgentSaul',
    },
    {
      name: 'AI Knowledge Assistant',
      tagline: 'Python + RAG knowledge assistant',
      description:
        'A document question-answering app: upload a document, it gets chunked and embedded into pgvector, and questions are answered from the most relevant chunks with streaming responses.',
      tech: [
        'Python 3.12',
        'FastAPI',
        'SQLAlchemy 2.0',
        'PostgreSQL + pgvector',
        'DashScope (Qwen)',
        'SSE',
        'Pydantic v2',
        'Docker',
      ],
      architecture:
        'FastAPI (async) · RAG pipeline (chunking → embedding → vector search → grounded answer) · SSE streaming',
      diagram: [
        'Client',
        'FastAPI (async)',
        'Chunking → Embedding (text-embedding-v3)',
        'PostgreSQL + pgvector (cosine)',
        'Qwen-plus (grounded, streaming)',
      ],
      github: 'https://github.com/scoreJIm/ai-assistant',
    },
  ],

  contact: {
    email: 'vvlovqq@gmail.com',
    phone: '+86 180 5623 8261',
    github: 'https://github.com/scoreJIm',
    linkedin: 'https://linkedin.com/in/weiweicareer',
    location: 'Nanjing, China · Relocation: ready for Germany',
  },
}
