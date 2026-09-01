import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import http from 'node:http';
import { authLimiter } from '../middleware/authRateLimiter.js';

async function startServer(app) {
  return new Promise((resolve) => {
    const server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

test('login requests are rate limited after configured threshold', async () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authLimiter);
  app.post('/api/auth/login', (req, res) => {
    res.json({ success: true, message: 'Login successful' });
  });

  const { server, port } = await startServer(app);
  const url = `http://127.0.0.1:${port}/api/auth/login`;

  try {
    for (let i = 0; i < 5; i += 1) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `user${i}@example.com`, password: 'abcd1234' }),
      });
      assert.equal(response.status, 200, `expected request ${i + 1} to succeed`);
    }

    const blocked = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user6@example.com', password: 'secret123' }),
    });

    assert.equal(blocked.status, 429, 'the sixth request should be throttled');
    const payload = await blocked.json();
    assert.equal(typeof payload.message, 'string');
    assert.match(payload.message, /Too many authentication attempts/i);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
