import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');
    try {
      const res = await axios.post('http://localhost:4000/api/login', { username, password });
      if (res.data && res.data.success) {
        setUser(res.data.user);
        setMessage('Login successful');
      } else {
        setMessage(res.data.message || 'Login failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Error');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 480, margin: '40px auto' }}>
      <h2>Simple Login</h2>
      {user ? (
        <div>
          <p>Welcome, <strong>{user.username}</strong>!</p>
          <button onClick={() => { setUser(null); setUsername(''); setPassword(''); setMessage(null); }}>Logout</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <div style={{ marginBottom: 8 }}>
            <label>Username</label><br/>
            <input value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: 8 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} />
          </div>
          <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
        </form>
      )}
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

export default App;
