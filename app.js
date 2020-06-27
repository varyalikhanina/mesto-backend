const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(json());
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use((req, res, next) => {
  req.user = {
    _id: '5ef63bc6683a6505865b1339',
  };
  next();
});
app.use('/cards', cards);
app.use('/users', users);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(`App listening on port ${PORT}`);
});
