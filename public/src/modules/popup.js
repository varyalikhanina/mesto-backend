export default class Popup {
    constructor(openButton, popup, closeButton) {
      this.openButton = openButton;
      this.closeButton = closeButton;
      this.popup = popup;
      this.setOpenClickListener();
      this.setCloseClickListener();
    }
    setOpenClickListener() {
      this.openButton.addEventListener('click', () => this.popup.classList.add('popup_is-opened'));
    }
    setCloseClickListener() {
      this.closeButton.addEventListener('click', () => this.popup.classList.remove('popup_is-opened'));
    }
}