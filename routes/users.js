const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data/users.json');
const readUsersPath = fs.readFileSync(usersPath);
const users = JSON.parse(readUsersPath);

usersRouter.get('/', (req, res) => {
  if (!users) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  } res.send(users);
});

function getUser(id) {
  return users.find((el) => el._id === id);
}

usersRouter.get('/:id', (req, res) => {
  if (getUser(req.params.id)) {
    res.send(getUser(req.params.id));
    return;
  }
  res.status(404).send({ message: 'Нет пользователя с таким id' });
});

module.exports = usersRouter;
