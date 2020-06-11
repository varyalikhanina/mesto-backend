export default class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
  create() {
    const template = document.getElementById('place-card-template');
    const placeCard = template.content.cloneNode(true).querySelector('.place-card');
    const cardImage = placeCard.querySelector('.place-card__image');
    cardImage.setAttribute('style', `background-image: url(${this.link})`);
    const cardName = placeCard.querySelector('.place-card__name');
    cardName.textContent = this.name;
    this.cardElement = placeCard;
    this.setEventListeners();
    return placeCard;
  }
  setEventListeners() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  }
  like(event) {
    if (event.target.closest('.place-card__like-icon')) {
      const card = event.target.closest('.place-card');
      const likeButtonToggled = card.querySelector('.place-card__like-icon');
      likeButtonToggled.classList.toggle('place-card__like-icon_liked');
    }; 
  }
  remove(event) {
    if (event.target.closest('.place-card__delete-icon')) {
      event.stopImmediatePropagation();
      const card = event.target.closest('.place-card');
      card.remove();
      this.cardElement = null;
    };
  }
}