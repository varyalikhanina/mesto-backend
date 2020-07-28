const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found');
const Unathorized = require('../errors/unathorized');
const BadRequest = require('../errors/bad-request');
const UserExists = require('../errors/user-exists');

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      next(new Unathorized('Неверная почта или пароль'));
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введите имя, информацию о себе, ссылку на аватар, почту и пароль'));
      } else {
        next(new UserExists('Такой пользователь уже существует'));
      }
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Нет пользователя с таким ID');
      }
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
};
