const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const catwaysRoutes = require('./routes/catways');
const usersRoutes = require('./routes/users');
const reservationsRoutes = require('./routes/reservations');
const auth = require('./middlewares/auth');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/catways', catwaysRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reservations', reservationsRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));