import axios from 'axios';

const base = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_ID}`;

export async function sendWhatsAppText(to, text) {
  await axios.post(
    `${base}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text }
    },
    { headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` } }
  );
}

export function verifyWebhook(req, res) {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) return res.status(200).send(challenge);
  return res.sendStatus(403);
}

export function extractIncomingMessage(body) {
  try {
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const msg = change?.value?.messages?.[0];
    const from = msg?.from;
    const text = msg?.text?.body;
    return { from, text };
  } catch {
    return { from: null, text: null };
  }
}
