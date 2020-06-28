const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user !== null) {
        res.status(200).res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким ID' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким ID' }));
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
