const cardsRouter = require('express').Router();

const {
  createCard,
  getAllCards,
  deleteCardbyId,
} = require('../controllers/cards');

cardsRouter.post('/', createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:id', deleteCardbyId);

module.exports = cardsRouter;
