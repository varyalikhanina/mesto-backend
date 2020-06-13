const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardsPath = path.join(__dirname, '../data/cards.json');
const readCardsPath = fs.readFileSync(cardsPath);
const cards = JSON.parse(readCardsPath);

cardsRouter.get('/', (req, res) => {
  try {
    if (!cards) {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    } res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Что-то пошло не так' });
  }
});

module.exports = cardsRouter;
