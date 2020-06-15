const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

let cards;

try {
  const cardsPath = path.join(__dirname, '../data/cards.json');
  const readCardsPath = fs.readFileSync(cardsPath);
  cards = JSON.parse(readCardsPath);
} catch (e) {
  /* eslint no-console: ["error", { allow: ["error"] }] */
  console.error('Что-то сломалось');
}

cardsRouter.get('/', (req, res) => {
  if (!cards) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    return;
  } res.send(cards);
});

module.exports = cardsRouter;
