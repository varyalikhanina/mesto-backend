const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/bad-request');
const {
  createCard,
  getAllCards,
  deleteCardbyId,
} = require('../controllers/cards');

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequest('Здесь должна быть ссылка на картинку');
      } else {
        return value;
      }
    }),
  }),
}), createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteCardbyId);

module.exports = cardsRouter;
