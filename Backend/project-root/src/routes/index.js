import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyWebhook } from '../integrations/whatsapp.js';
import { handleIncomingMessage } from '../controllers/whatsappController.js';
import { basicAuth } from '../middlewares/auth.js';
import { pool } from '../db/connection.js';

export const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'src/uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
  })
});

// WhatsApp Webhook
router.get('/webhook/whatsapp', verifyWebhook);
router.post('/webhook/whatsapp', handleIncomingMessage);

// Health
router.get('/health', (req, res) => res.send('OK 🚀'));

// Admin — protegido
router.post('/admin/reindex', basicAuth, async (req, res) => {
  // Aqui você pode acionar um job de reindexação (futuro).
  res.json({ ok: true, jobId: Date.now().toString() });
});

// Upload de documentos oficiais (para o painel)
router.post('/admin/docs', basicAuth, upload.single('file'), async (req, res) => {
  const { originalname, filename } = req.file || {};
  const { type } = req.body || {};
  if (!filename) return res.status(400).json({ error: 'Arquivo obrigatório' });

  const title = originalname || filename;
  const docType = type || 'generic';

  // registra documento + versão 1
  const { v4: uuid } = await import('uuid');
  const docId = uuid();
  const docvId = uuid();

  await pool.query('INSERT INTO documents (id, title, doc_type) VALUES ($1,$2,$3)', [docId, title, docType]);
  await pool.query(
    'INSERT INTO document_versions (id, document_id, version, source_uri) VALUES ($1,$2,$3,$4)',
    [docvId, docId, 1, path.join('src/uploads', filename)]
  );

  res.json({ id: docId, versionId: docvId, title, type: docType });
});

// Logs (simples) — exemplo lê últimas 50 mensagens como "logs"
router.get('/admin/logs', basicAuth, async (req, res) => {
  const { rows } = await pool.query(
    "SELECT gen_random_uuid()::text as id, 'info' as level, content as message, '{}'::jsonb as meta, created_at FROM messages ORDER BY created_at DESC LIMIT 50"
  ).catch(() => ({ rows: [] }));
  res.json(rows);
});

// Conversas recentes
router.get('/admin/conversations', basicAuth, async (req, res) => {
  const { rows } = await pool.query('SELECT id, wa_user_id, created_at FROM conversations ORDER BY created_at DESC LIMIT 50');
  res.json(rows);
});
