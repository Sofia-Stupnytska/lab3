const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secretKey = 'your_secret_key'; // Replace with a secure secret key

// Set up the database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number TEXT, userId INTEGER)");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, phone TEXT)");
});

app.use(bodyParser.json());

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Contact Endpoints
app.get('/api/contacts', authenticateToken, (req, res) => {
  db.all("SELECT * FROM contacts WHERE userId = ?", [req.user.id], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.post('/api/contacts', authenticateToken, (req, res) => {
  const { name, number } = req.body;
  db.run(`INSERT INTO contacts (name, number, userId) VALUES (?, ?, ?)`, [name, number, req.user.id], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, name, number, userId: req.user.id }
    });
  });
});

app.put('/api/contacts/:id', authenticateToken, (req, res) => {
  const { name, number } = req.body;
  db.run(`UPDATE contacts SET name = ?, number = ? WHERE id = ? AND userId = ?`, [name, number, req.params.id, req.user.id], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: req.params.id, name, number }
    });
  });
});

app.delete('/api/contacts/:id', authenticateToken, (req, res) => {
  db.run(`DELETE FROM contacts WHERE id = ? AND userId = ?`, [req.params.id, req.user.id], function(err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "deleted" });
  });
});

// User Endpoints
app.post('/api/signup', (req, res) => {
  const { username, password, email, phone } = req.body;
  if (!username || !password || !email || !phone) {
    res.status(400).json({ "error": "Please provide all required fields" });
    return;
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    db.run(`INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)`, [username, hash, email, phone], function(err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": { id: this.lastID, username, email, phone }
      });
    });
  });
});

app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ "error": "Please provide username and password" });
    return;
  }
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (!user) {
      res.status(400).json({ "error": "User not found" });
      return;
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ username: user.username, id: user.id }, secretKey, { expiresIn: '1h' });
        res.json({
          "message": "success",
          "data": { id: user.id, username: user.username, email: user.email, phone: user.phone, token }
        });
      } else {
        res.status(400).json({ "error": "Invalid password" });
      }
    });
  });
});

app.get('/api/profile', authenticateToken, (req, res) => {
  db.get(`SELECT username, email, phone FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (!user) {
      res.status(404).json({ "error": "User not found" });
      return;
    }
    db.get(`SELECT COUNT(*) AS amountOfContacts FROM contacts WHERE userId = ?`, [req.user.id], (err, count) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      const userProfile = {
        nickname: user.username,
        email: user.email,
        phone: user.phone,
        gender: 'Unknown', // Update this to fetch actual data if available
        status: 'Active', // Update this to fetch actual data if available
        amountOfContacts: count.amountOfContacts
      };
      res.json(userProfile);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
