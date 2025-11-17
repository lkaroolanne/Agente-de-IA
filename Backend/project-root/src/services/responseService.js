import axios from 'axios';
import fs from 'fs/promises';

export async function askClaudeControlled(userText) {
  const system = await fs.readFile('src/prompts/systemPrompt.pt.txt', 'utf-8');
  const payload = {
    model: process.env.CLAUDE_MODEL,
    max_tokens: Number(process.env.CLAUDE_MAX_TOKENS || 600),
    system,
    messages: [{ role: 'user', content: userText }]
  };

  const { data } = await axios.post(
    'https://api.anthropic.com/v1/messages',
    payload,
    { headers: { 'x-api-key': process.env.CLAUDE_API_KEY, 'content-type': 'application/json' } }
  );

  return data?.content?.[0]?.text || 'Não encontrei essa informação nos documentos oficiais.';
}
