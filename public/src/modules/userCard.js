import Card from "./card.js";

export default class UserCard {
  constructor(anyForm, popup, container, submitButton) {
    this.anyForm = anyForm;
    this.popup = popup;
    this.container = container;
    this.submitButton = submitButton;
    this.setFormListener();
  }
  handleSubmit(event) {
    event.preventDefault();
    const newCard = new Card(this.anyForm.name.value, this.anyForm.link.value);
    const result = newCard.create();
    this.container.appendChild(result);
    this.popup.classList.remove('popup_is-opened');
    this.anyForm.reset();
    this.submitButton.classList.remove('popup__button_valid');
    this.submitButton.classList.add('popup__button_invalid');
  }
  setFormListener() {
    this.anyForm.addEventListener('submit', (event) => this.handleSubmit(event));
  }
}