const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/api/login', (req, res) => {
  res.send({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/api/login'));