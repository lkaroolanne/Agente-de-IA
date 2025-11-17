import { v4 as uuid } from 'uuid';
import pino from 'pino';
export const logger = pino({ transport: { target: 'pino-pretty' } });

export function audit(req, res, next) {
  const reqId = uuid();
  req.reqId = reqId;
  const meta = { reqId, path: req.path, method: req.method };
  logger.info({ meta }, 'HTTP IN');
  res.on('finish', () => logger.info({ meta, status: res.statusCode }, 'HTTP OUT'));
  next();
}
