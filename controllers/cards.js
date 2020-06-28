const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getAllCards = (req, res) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const deleteCardbyId = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card !== null) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'Нет карточки с таким ID' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  createCard,
  getAllCards,
  deleteCardbyId,
};
