var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET some route */
router.get('/some-route', async (req, res) => {
  try {
    const result = await req.pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* POST login route */
router.post('/login', async (req, res) => {
  try {
    const loginSuccess = await req.login.authenticate(req.body.email, req.body.passwort);
    if (loginSuccess) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
