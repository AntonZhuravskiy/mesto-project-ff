// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, cardDelete, handleLike } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
} from "./components/modal.js";

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

// Контейнер для карточек
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

// Открытие попапа изображения
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Рендер карточки универсальным способом
const callbacks = { cardDelete, handleLike, openImagePopup };

function renderCard(cardData, method = "prepend") {
  const cardElement = createCard({ cardData, ...callbacks });
  cardList[method](cardElement);
}

// Вывод начальных карточек
initialCards.forEach((cardData) => renderCard(cardData, "append"));

// Обработчики
editButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

addButton.addEventListener("click", () => {
  openModal(addPopup); // просто открываем, не сбрасывая форму
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
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(editPopup);
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(cardData); // вставка в начало
  closeModal(addPopup);
  cardForm.reset();
});
