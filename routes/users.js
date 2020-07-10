const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUserById,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
