export default class UserInfo {
  constructor(name, about, photo, anyForm, popup, api, openPopupButton) {
    this.name = name;
    this.about = about;
    this.photo = photo;
    this.anyForm = anyForm;
    this.popup = popup;
    this.api = api;
    this.openPopupButton = openPopupButton;
    this.anyForm.querySelector('.popup__button_new').disabled = true;
    this.setUserInfo();
    this.setFormListener();
    this.setInputValues();
  }
  setUserInfo() {
    this.api.getData()
    .then((res) => {
      this.name.textContent = res.name;
      this.about.textContent = res.about;
      this.anyForm.name.value = res.name;
      this.anyForm.about.value = res.about;
      this.photo.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
  }
  updateUserInfo(event) {
    event.preventDefault();
    this.api.patchData(this.anyForm.name.value, this.anyForm.about.value)
    .then((res) => {
      this.name.textContent = res.name;
      this.about.textContent = res.about;
      this.popup.classList.remove('popup_is-opened');
    })
    .catch((err) => {
      console.log(err);
    })
  } 
  setFormListener() {
    this.anyForm.addEventListener('submit', (event) => this.updateUserInfo(event));
   }
  setInputValues() {
    this.openPopupButton.addEventListener('click', () => {
      this.anyForm.name.value = this.name.textContent;
      this.anyForm.name.nextElementSibling.textContent = '';
      this.anyForm.about.value = this.about.textContent;
      this.anyForm.about.nextElementSibling.textContent = '';
      const submitUserInfoButton = this.anyForm.querySelector('.popup__button_new');
      submitUserInfoButton.disabled = true;
      submitUserInfoButton.classList.remove('popup__button_valid');
      submitUserInfoButton.classList.add('popup__button_invalid');
    })
  }
}