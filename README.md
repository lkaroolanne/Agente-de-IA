# 🤖 IA Agent – Assistente Inteligente de Atendimento e Suporte  

## 🧭 Visão Geral  

O **IA Agent** é um agente conversacional inteligente desenvolvido para **automatizar o atendimento ao cliente, suporte técnico e processos internos** da empresa.  
O projeto foi idealizado para **reduzir tarefas repetitivas**, **aumentar a eficiência da equipe** e **padronizar respostas**, sempre em conformidade com a **LGPD**.  

Atualmente, o foco principal está nas áreas de **Vendas** e **Suporte Técnico**, mas a estrutura foi desenhada para ser **expansível** e **multicanal** — podendo futuramente atender em plataformas como WhatsApp, Web Chat e outros canais corporativos.

---

## 🎯 Objetivos do Projeto  

- Atender dúvidas frequentes (preços, políticas, status de pedido etc.)  
- Ajudar no processo de vendas (captação, qualificação e envio de propostas)  
- Realizar suporte técnico básico (passo a passo, triagem, abertura de chamados)  
- Enviar lembretes automáticos (boletos, cobranças e notificações)  
- No futuro: responder perguntas internas e executar comandos administrativos  

---

## ⚙️ Situação Atual  

🚧 O projeto está em **fase de desenvolvimento e testes internos**.  
Atualmente, o bot ainda não está 100% funcional, mas a **estrutura técnica e os fluxos principais já estão montados**.

### ✅ Já implementado

- Estrutura base do backend (Node.js + Express)  
- Banco de dados PostgreSQL com migrações automáticas  
- Docker Compose com containers independentes para API e DB  
- Autenticação básica (Basic Auth para painel interno)  
- Logging e auditoria de operações  
- Preparação para integração com **xamado-backend**  
- Configuração de ambiente `.env` e scripts de inicialização  

---

## 🧠 Inteligência Artificial  

A IA utilizada é a **Claude AI** (Anthropic).  
Ela será responsável por interpretar mensagens em linguagem natural, responder com base em documentos oficiais e integrar-se aos fluxos da empresa.

> ⚠️ A integração da IA Claude será ativada apenas após autorização formal e definição das fontes oficiais de conhecimento (documentos, políticas, tutoriais, etc.).  

---

## ⚡ Stack Técnica  

| Componente              | Tecnologia                       |
|------------------------|----------------------------------|
| **Backend**            | Node.js (ES Modules)             |
| **Framework**          | Express                          |
| **Banco de Dados**     | PostgreSQL                       |
| **Driver**             | pg                               |
| **IA (futuro próximo)**| Claude AI (Anthropic API)        |
| **Integrações Planejadas** | WhatsApp Cloud API / xamado-backend |
| **Logs**               | Pino + JSON                     |
| **Autenticação**       | Basic Auth                      |
| **Ambiente**           | Docker Compose (API + DB)       |

---

## 📂 Estrutura de Pastas (resumo)

```bash
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
