import Card from "./card.js";

export default class CardList {
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }
  render() {
    this.api.getData()
    .then((res) => {
      const newArray = res.map((card) => {
        const newCard = new Card(card.name, card.link);
        return newCard.create();
      });
      newArray.forEach(element => {
        this.container.appendChild(element);
      });
    })
  .catch((err) => {
    console.log(err);
  })
  }
}