const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// NOTE: This is intentionally insecure for testing purposes (see SECURITY_ANALYSIS.md)
const users = [
  { id: 1, username: 'alice', password: 'password123' },
  { id: 2, username: 'bob', password: 'qwerty' }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Insecure: returning user info without token, no hashing, no session management
  return res.json({ success: true, user: { id: user.id, username: user.username } });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
