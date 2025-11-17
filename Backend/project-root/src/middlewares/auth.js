export function basicAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  if (!hdr.startsWith('Basic ')) return res.status(401).send('Unauthorized');
  const [u, p] = Buffer.from(hdr.split(' ')[1], 'base64').toString().split(':');
  if (u === process.env.BASIC_AUTH_USER && p === process.env.BASIC_AUTH_PASS) return next();
  return res.status(401).send('Unauthorized');
}
