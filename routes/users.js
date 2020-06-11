const usersRouter = require("express").Router();
const promise = require('fs').promises;
const users = require('../data/users');
usersRouter.get("/", (req, res) => {
  promise.readFile('./data/users.json')
  .then((data) => {
    res.status(200).send(JSON.parse(data));
  })
  .catch((err) => {
    console.log(err);
  });
});
usersRouter.get("/:id", (req, res) => {
  if(!users[req.params.id]) {
    res.send({ "message": "Нет пользователя с таким id" });
    return;
  }
  res.send(users[req.params.id]);
});
module.exports = usersRouter;