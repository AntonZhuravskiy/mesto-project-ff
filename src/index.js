

import "./pages/index.css";
import { createCard, deleteCard, handleLike } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
} from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  updateAvatar,
  addCard,
} from './components/api.js';

let userId;

function setUserInfo(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    setUserInfo(userData);
    renderInitialCards(cards);
  })
  .catch((err) => {
    console.error('Ошибка загрузки данных:', err);
  });

// Попапы
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

// Контейнер карточек
const cardList = document.querySelector(".places__list");

// Форма профиля
const profileForm = document.forms["edit-profile"];
const profileNameInput = profileForm.elements["name"];
const profileJobInput = profileForm.elements["description"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Форма карточки
const cardForm = document.forms["new-place"];
const cardNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements["link"];

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);

// Открытие попапа изображения
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Коллбэки карточек
const callbacks = { cardDelete: deleteCard, handleLike, openImagePopup };

function renderCard(cardData, method = "prepend") {
  const cardElement = createCard({
    cardData,
    ...callbacks,
    userId,
  });
  cardList[method](cardElement);
}

function renderInitialCards(cards) {
  cards.forEach((cardData) => renderCard(cardData, "append"));
}

// Обработчики
editButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openModal(addPopup);
});

closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.addEventListener("mousedown", handleOverlayClick));

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = profileNameInput.value;
  const about = profileJobInput.value;

  updateUserInfo({ name, about })
    .then((userData) => {
      setUserInfo(userData);
      closeModal(editPopup);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
    });
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(cardData)
    .then((newCard) => {
      renderCard(newCard);
      closeModal(addPopup);
      cardForm.reset();
      clearValidation(cardForm, validationConfig);
    })
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
    });
});
