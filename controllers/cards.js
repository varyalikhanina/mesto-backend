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
  Card.findById(req.user.id)
    .orFail(() => res.status(404).send({ message: 'Карточки с таким ID не существует' }))
    .then((card) => {
      const { owner } = card;
      if (req.user._id === owner.toString()) {
        return Card.findByIdAndRemove(req.user._id);
      } res.status(403).send({ message: 'Вы не можете удалить чужую карточку' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  createCard,
  getAllCards,
  deleteCardbyId,
};
