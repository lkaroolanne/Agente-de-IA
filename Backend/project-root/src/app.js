import express from 'express';
import bodyParser from 'body-parser';
import { audit } from './middlewares/audit.js';
import { router } from './routes/index.js';

export const app = express();
app.use(bodyParser.json({ limit: '2mb' }));
app.use(audit);
app.use('/', router);
