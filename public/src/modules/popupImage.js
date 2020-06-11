export default class PopupImage {
  constructor(container, closeButton) {
    this.container = container;
    this.closeButton = closeButton;
    this.container.addEventListener('click', this.open);
    this.closeButton.addEventListener('click', this.close);
  }
  open(event) {
    if (event.target.closest('.place-card__image')) {
      const popupImages = document.querySelector('.popup_images');
      popupImages.classList.add('popup_is-opened');
      const image = popupImages.querySelector('.popup__image');
      image.src = event.target.style.backgroundImage.slice(5, -2);
    }
  }
  close() {
    const popupImages = document.querySelector('.popup_images');
    popupImages.classList.remove('popup_is-opened');
  }
}