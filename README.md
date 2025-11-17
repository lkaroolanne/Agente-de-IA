🤖 IA Agent – Assistente Inteligente de Atendimento e Suporte

Sistema conversacional inteligente desenvolvido para automatizar atendimento, suporte e vendas usando arquitetura escalável e pronta para IA avançada.

🧭 Visão Geral

O IA Agent reduz tarefas repetitivas, padroniza o atendimento e aumenta a produtividade operacional.
Foi projetado com arquitetura moderna, modular e pronta para IA avançada (Claude AI) e operação multicanal (WhatsApp, WebChat e mais).

🎯 Objetivos do Projeto
✔️ Atendimento

Responder dúvidas frequentes

Automatizar respostas pré-definidas

Suporte técnico básico

✔️ Vendas

Captar e qualificar leads

Registrar conversas e intenções

Enviar informações de produtos/serviços

✔️ Suporte & Backoffice

Abrir e consultar chamados (futuro – xamado-backend)

Enviar lembretes automáticos

FAQ interno

⚙️ Status do Projeto
🔧 Infraestrutura já construída

Backend: Node.js + Express

Banco: PostgreSQL

Ambiente: Docker Compose

Logs: Pino

Auth: Basic Auth

Migrações SQL automáticas

Arquitetura modular e escalável

🧠 Inteligência Artificial (em preparação)

IA baseada em Claude AI, com respostas estruturadas usando:

Documentos oficiais

Procedimentos internos

Políticas da empresa

⚠️ A IA só será ativada após o envio dos documentos oficiais.

🔌 Integrações Futuras

WhatsApp Cloud API

xamado-backend

Painel administrativo com métricas

⚡ Stack Técnica
| Componente | Tecnologia      |
|-----------|-----------------|
| Backend   | Node.js (ESM)   |
| Framework | Express         |
| Banco     | PostgreSQL      |
| Migrations| SQL puro        |
| Logs      | Pino            |
| Auth      | Basic Auth      |
| IA        | Claude AI       |
| Ambiente  | Docker Compose  |

📁 Estrutura de Pastas
src/
 ┣ controllers/
 ┣ db/
 ┃ ┣ connection.js
 ┃ ┣ migrations.sql
 ┃ ┗ migrate.js
 ┣ middlewares/
 ┣ routes/
 ┣ services/
 ┣ uploads/
 ┗ server.js

docker-compose.yml
package.json
.env (não versionado)
README.md

🧾 Configuração do .env

Crie o arquivo .env na raiz:

# API
PORT=3000
NODE_ENV=development

# Claude (Anthropic)
CLAUDE_API_KEY=coloque_sua_chave
CLAUDE_MODEL=claude-3-5-sonnet-20241022
CLAUDE_MAX_TOKENS=600

# WhatsApp Cloud API
WHATSAPP_TOKEN=seu_token_meta
WHATSAPP_PHONE_ID=seu_phone_number_id
WHATSAPP_VERIFY_TOKEN=meu_token_de_verificacao

# PostgreSQL
PGHOST=postgres
PGPORT=5432
PGDATABASE=ia_agent
PGUSER=postgres
PGPASSWORD=postgres

# Painel (Basic Auth)
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=trocar123


📌 Importante:

Com Docker → PGHOST=postgres

Sem Docker → PGHOST=localhost

🐘 Banco de Dados

Tabelas criadas automaticamente:

conversations
messages
logs
documents
document_versions


Migrações:

src/db/migrations.sql


Executar:

npm run migrate

🧱 Docker Compose (Ambiente Completo)
version: "3.9"

services:
  api:
    build: .
    container_name: ia_agent_api
    env_file: .env
    ports:
      - "3000:3000"
    volumes:
      - ./src/uploads:/app/src/uploads
    depends_on:
      - postgres
    restart: unless-stopped
    command: >
      sh -c "npm run migrate && npm start"

  postgres:
    image: postgres:16
    container_name: ia_agent_db
    environment:
      POSTGRES_DB: ia_agent
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:

🧪 Scripts NPM
"scripts": {
  "dev": "node --watch src/server.js",
  "start": "node src/server.js",
  "migrate": "node src/db/migrate.js"
}

Funções
Script	Descrição
npm run dev	Inicia API com reload automático
npm start	Inicia API em produção
npm run migrate	Executa migrações SQL
🧑‍💻 Guia de Instalação
📌 1. Pré-requisitos

Instale no computador:

Git

Node.js 18+

Docker Desktop + Compose

VSCode (recomendado)

📌 2. Clonar o Repositório
git clone https://github.com/seu-usuario/ia-whatsapp-agent.git
cd ia-whatsapp-agent

📌 3. Instalar Dependências
npm install

📌 4. Criar Arquivo .env
cp .env.example .env


Ou criar manualmente.

📌 5. Rodar com Docker (Recomendado)
docker-compose up --build


Fluxo:

PostgreSQL inicia

API sobe

Migrações executam

API disponível em:

👉 http://localhost:3000

📌 6. Rodar Sem Docker

Criar banco:

createdb ia_agent


Ajustar .env:

PGHOST=localhost


Rodar migrações:

npm run migrate


Iniciar API:

npm run dev

📈 Benefícios Esperados

Redução da carga operacional

Atendimento padronizado

Registro centralizado

Base pronta para IA avançada

Preparado para WhatsApp / Web Chat

Pronto para integração com sistema de chamados

🚀 Roadmap

🔗 Integração com xamado-backend

📄 Indexação dos documentos oficiais

🤖 Ativar IA Claude

💬 Integração com WhatsApp Cloud API

📊 Painel administrativo com métricas

📋 Resumo Final

O IA Agent possui uma base sólida, escalável e moderna.
Assim que a IA for ativada e os documentos oficiais indexados, o sistema estará pronto para testes reais.
