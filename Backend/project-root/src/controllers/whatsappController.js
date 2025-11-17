import { extractIncomingMessage, sendWhatsAppText } from '../integrations/whatsapp.js';
import { askClaudeControlled } from '../services/responseService.js';
import { pool } from '../db/connection.js';
import { v4 as uuid } from 'uuid';

export async function handleIncomingMessage(req, res) {
  const { from, text } = extractIncomingMessage(req.body);
  if (!from || !text) return res.sendStatus(200); // ack vazio para eventos não suportados

  await ensureConversation(from);

  const reply = await askClaudeControlled(text);

  await sendWhatsAppText(from, reply);

  await pool.query(
    'INSERT INTO messages (id, conversation_id, sender, content) VALUES ($1,$2,$3,$4)',
    [uuid(), from, 'user', text]
  );
  await pool.query(
    'INSERT INTO messages (id, conversation_id, sender, content) VALUES ($1,$2,$3,$4)',
    [uuid(), from, 'assistant', reply]
  );

  return res.sendStatus(200);
}

async function ensureConversation(from) {
  const { rowCount } = await pool.query('SELECT 1 FROM conversations WHERE id=$1', [from]);
  if (!rowCount) {
    await pool.query('INSERT INTO conversations (id, wa_user_id) VALUES ($1,$2)', [from, from]);
  }
}
