# 🤖 **IA Agent – Assistente Inteligente de Atendimento e Suporte**

Sistema conversacional inteligente desenvolvido para automatizar atendimento, suporte e vendas usando uma arquitetura escalável e preparada para IA avançada.

---

## 🧭 **Visão Geral**

O **IA Agent** reduz tarefas repetitivas, padroniza o atendimento e melhora a produtividade operacional.  
Criado com arquitetura moderna, modular e pronta para **Claude AI** e canais multicanal.

---

## 🎯 **Objetivos do Projeto**

### ✔️ **Atendimento**
- Responder dúvidas frequentes  
- Automatizar respostas pré-definidas  
- Realizar suporte técnico básico  

### ✔️ **Vendas**
- Captar e qualificar leads  
- Registrar intenções e conversas  
- Enviar informações de produtos e serviços  

### ✔️ **Suporte & Backoffice**
- Abertura e consulta de chamados *(integração futura com xamado-backend)*  
- Lembretes automáticos  
- FAQ interno inteligente  

---

## ⚙️ **Status Atual do Projeto**

### 🔧 **Infraestrutura construída**
- Node.js + Express  
- PostgreSQL  
- Docker Compose  
- Logs estruturados com Pino  
- Basic Auth  
- Migrações SQL  
- Arquitetura modular  

### 🧠 **Inteligência Artificial (fase de preparação)**
- Integração com **Claude AI**  
- Respostas baseadas em documentos oficiais  
- IA será ativada apenas mediante autorização  

### 🔌 **Integrações planejadas**
- WhatsApp Cloud API  
- xamado-backend  
- Painel administrativo  

---

## ⚡ **Stack Técnica**

| Componente | Tecnologia |
|-----------|------------|
| Backend | Node.js (ESM) |
| Framework | Express |
| Banco | PostgreSQL |
| Migrations | SQL puro |
| Logs | Pino |
| Autenticação | Basic Auth |
| IA (futuro) | Claude AI |
| Ambiente | Docker Compose |

---

## 📁 **Estrutura de Pastas**

```txt
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

** Configuração do .env **
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


📌 Observação

Com Docker → PGHOST=postgres

Sem Docker → PGHOST=localhost

🐘 Banco de Dados

Tabelas criadas automaticamente:

conversations

messages

logs

documents

document_versions

Rodar migrações:

npm run migrate

🧱 Docker Compose
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

🧑‍💻 Guia de Instalação
📌 1. Pré-requisitos

Git

Node.js 18+

Docker Desktop

VSCode

📌 2. Clonar repositório
git clone https://github.com/seu-usuario/ia-whatsapp-agent.git
cd ia-whatsapp-agent

📌 3. Instalar dependências
npm install

📌 4. Criar .env
cp .env.example .env

📌 5. Rodar com Docker (recomendado)
docker-compose up --build


API disponível em:

http://localhost:3000

📌 6. Rodar sem Docker

Criar banco:

createdb ia_agent


Rodar migrações:

npm run migrate


Iniciar API:

npm run dev

📈 Benefícios Esperados

Redução da carga operacional

Atendimento padronizado

Registro centralizado

Base pronta para IA avançada

Preparado para WhatsApp e Web Chat

Integração futura com sistema de chamados

🚀 Roadmap

🔗 Integração com xamado-backend

📄 Indexação de documentos oficiais

🤖 IA Claude ativada

💬 WhatsApp Cloud API

📊 Painel administrativo com métricas

📋 Resumo Final

O IA Agent possui uma base sólida, moderna e totalmente preparada para integrações avançadas com IA.
Após a ativação da IA e indexação dos documentos, o sistema estará pronto para testes reais e ambiente de produção.
