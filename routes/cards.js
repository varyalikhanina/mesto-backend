const cardsRouter = require("express").Router();
const promise = require('fs').promises;
cardsRouter.get("/", (req, res) => {
  promise.readFile('./data/cards.json')
  .then((data) => {
    res.status(200).send(JSON.parse(data));
  })
  .catch((err) => {
    console.log(err);
  });
});
module.exports = cardsRouter;