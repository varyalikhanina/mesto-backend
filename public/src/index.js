import "./pages/index.css";

import Api from "./modules/api";
import CardList from "./modules/cardList";
import FormValidator from "./modules/formValidator";
import Popup from "./modules/popup";
import PopupImage from "./modules/popupImage";
import UserCard from "./modules/userCard";
import UserInfo from "./modules/userInfo";

//карточки с сервера
const apiCards = new Api('https://praktikum.tk/cohort10/cards', '319cdcca-2720-462d-92f1-a963880ecfc3');

//данные о пользователе с сервера
const apiUser = new Api('https://praktikum.tk/cohort10/users/me', '319cdcca-2720-462d-92f1-a963880ecfc3');

//место, куда записываем карточки
const placesList = document.querySelector('.places-list');

//карточки с сервера
const cardList = new CardList(placesList, apiCards);
cardList.render();

//открытие попапа для редактирования карточки
const addCardButton = document.querySelector('.user-info__button');
const popUp = document.querySelector('.popup');
const popUpCloseButton = document.querySelector('.popup__close');

new Popup(addCardButton, popUp, popUpCloseButton);

//открытие попапа для редактирования информации об авторе
const edit = document.querySelector('.user-info__edit');
const newPopUp = document.querySelector('.popup_new');
const popUpCloseButtonNew = document.querySelector('.popup__close_new');
new Popup(edit, newPopUp, popUpCloseButtonNew);

//открытие попапа с картинкой
const closeImagesButton = document.querySelector('.popup__close_images');
const newPopupImage = new PopupImage(placesList, closeImagesButton);

//данные о пользователе, подгружаемые с сервера
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo');
const userNameInput = document.querySelector('.popup__input_type_name_new');
const userJobInput = document.querySelector('.popup__input_type_link-url_new');
const who = document.forms.who;
new UserInfo(userName, userJob, userPhoto, who, newPopUp, apiUser, edit);

//добавление карточки из формы
const form = document.forms.new;
const submitCardButton = document.querySelector('.popup__button_card');
new UserCard(form, popUp, placesList, submitCardButton);

//валидация форм и отправка данных о пользователе на сервер
const checkCardForm = new FormValidator(form);
checkCardForm.setEventListeners();
const checkInfoForm = new FormValidator(who);
checkInfoForm.setEventListeners();