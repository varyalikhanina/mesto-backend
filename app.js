const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/cards', auth, cards);
app.use('/users', auth, users);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(`App listening on port ${PORT}`);
});
