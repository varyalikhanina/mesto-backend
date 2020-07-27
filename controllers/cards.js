const Card = require('../models/card');

const NotFoundError = require('../errors/not-found');
const Forbidden = require('../errors/forbidden');
const BadRequest = require('../errors/bad-request');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((user) => res.send({ data: user }))
    .catch(() => next(new BadRequest('Введите имя карточки и ссылку на картинку')));
};

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const deleteCardbyId = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Карточки с таким ID не существует'))
    .then((card) => {
      const { owner } = card;
      if (req.user._id === owner.toString()) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      } else {
        throw new Forbidden('Вы не можете удалить чужую карточку');
      }
    })
    .catch(next);
};

module.exports = {
  createCard,
  getAllCards,
  deleteCardbyId,
};
