-- One-time setup for the shared PostgreSQL container (runs only on first start,
-- when the data volume is empty). Creates one database per project and enables
-- pgvector on the RAG assistant's database.

CREATE DATABASE neopick;
CREATE DATABASE agentsaul;
CREATE DATABASE ai_assistant;

\c ai_assistant
CREATE EXTENSION IF NOT EXISTS vector;
