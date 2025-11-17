🤖 IA Agent – Assistente Inteligente de Atendimento e Suporte

Sistema conversacional inteligente desenvolvido para automatizar atendimento, suporte e vendas usando arquitetura escalável e pronta para IA avançada.

🧭 Visão Geral

O IA Agent é um agente conversacional criado para reduzir tarefas repetitivas, padronizar o atendimento e aumentar a produtividade operacional.
Foi desenvolvido com arquitetura moderna, modular e totalmente preparada para integração com IA (Claude AI) e canais multicanal, como WhatsApp.

🎯 Objetivos do Projeto
✔️ Atendimento

Responder dúvidas frequentes

Automatizar respostas pré-definidas

Realizar suporte técnico básico

✔️ Vendas

Captar, qualificar e registrar leads

Enviar informações de serviços e produtos

✔️ Suporte e Backoffice

Abrir e consultar chamados (futuro – integração com xamado-backend)

Enviar lembretes automáticos (segunda via, avisos, follow-up)

Ajudar com FAQ interno da empresa

⚙️ Status do Projeto (Situação Atual)
🔧 Infraestrutura já construída

Backend em Node.js + Express

Banco de dados PostgreSQL

Ambiente completo usando Docker Compose

Sistema de logs (Pino)

Autenticação Basic Auth

Migrações automáticas SQL

Estrutura modular profissional

🧠 Inteligência Artificial (futuro próximo)

Preparado para Claude AI (Anthropic)

IA responderá com base em:

Documentos oficiais

Procedimentos internos

Políticas da empresa

Só será ativada após envio/autorização dos documentos corporativos

🔌 Integrações Futuras

WhatsApp Cloud API

xamado-backend

Painel administrativo com métricas

⚡ Stack Técnica
Componente	Tecnologia
Backend	Node.js (ESM)
Framework	Express
Banco	PostgreSQL
Migrations	SQL puro
Logs	Pino
Auth	Basic Auth
IA (futuro)	Claude AI
Ambiente	Docker Compose
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

🧾 Configuração do Arquivo .env

Crie o arquivo .env na raiz do projeto:

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

📌 Importante

Para rodar com Docker: PGHOST=postgres

Para rodar local sem Docker: PGHOST=localhost

🐘 Banco de Dados

As tabelas são criadas automaticamente:

conversations

messages

logs

documents

document_versions

As migrações ficam em:

src/db/migrations.sql


E são executadas via:

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

Script	Função
npm run dev	Inicia API com reload automático
npm start	Inicia API em produção
npm run migrate	Executa as migrações SQL
🧑‍💻 Guia de Instalação
📌 1. Pré-requisitos

Instale no computador:

Git

Node.js 18+

Docker Desktop + Docker Compose

VSCode (recomendado)

📌 2. Clonar o Repositório
git clone https://github.com/seu-usuario/ia-whatsapp-agent.git
cd ia-whatsapp-agent

📌 3. Instalar Dependências
npm install

📌 4. Criar Arquivo .env
cp .env.example .env


Ou crie manualmente e cole as variáveis acima.

📌 5. Rodar com Docker (RECOMENDADO)
docker-compose up --build


Fluxo automático:

PostgreSQL inicia

API inicia

Migrações são executadas

API disponível em:

👉 http://localhost:3000

📌 6. Rodar Sem Docker (opcional)

Criar banco:

createdb ia_agent


Ajustar .env:

PGHOST=localhost


Rodar migrações:

npm run migrate


Iniciar API:

npm run dev

📈 Benefícios Esperados

Redução de carga operacional

Atendimento padronizado

Registro centralizado

Base pronta para IA avançada

Preparado para canais multicanais (WhatsApp / Web Chat)

Preparado para integração com sistema de chamados

🚀 Próximos Passos (Roadmap)

🔗 Integração com xamado-backend

📄 Indexação dos documentos oficiais

🤖 Ativar IA Claude

💬 Integração WhatsApp Cloud API

📊 Painel administrativo com métricas

📋 Resumo Final

O IA Agent possui uma estrutura sólida e profissional, pronta para escalar e receber IA avançada.
Após ativação da IA e integração com os documentos oficiais, o sistema poderá entrar em testes reais.
