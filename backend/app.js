require('dotenv').config();
const express = require('express');
const cors = require('cors');

const contactRouter = require('./routes/contact');
let adminRouter;
let healthRouter;

try { adminRouter = require('./routes/admin'); } catch(e){ console.warn('Admin router not found'); }
try { healthRouter = require('./routes/health'); } catch(e){ console.warn('Health router not found'); }

const app = express();

// JSON, CORS
app.use(express.json());

const origins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];
app.use(cors({ origin: function(origin, cb) {
  if (!origin) return cb(null, true); // allow non-browser clients
  cb(null, origins.includes(origin));
}}));

// Mount routers (if present)
app.use('/api/contact', contactRouter);
if (adminRouter) app.use('/api/admin', adminRouter);
if (healthRouter) app.use('/api/healthz', healthRouter);

// basic health if route missing
if (!healthRouter) {
  app.get('/api/healthz', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));
}

module.exports = app;
