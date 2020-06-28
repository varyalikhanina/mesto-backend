const usersRouter = require('express').Router();

const {
  createUser,
  getAllUsers,
  getUserById,
} = require('../controllers/users');

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);

module.exports = usersRouter;
