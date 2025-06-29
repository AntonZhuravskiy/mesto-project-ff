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

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

const cardList = document.querySelector(".places__list");

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements["name"];
const jobInput = formElement.elements["description"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newCardForm = document.forms["new-place"];
const placeNameInput = newCardForm.elements["place-name"];
const placeLinkInput = newCardForm.elements["link"];

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, cardDelete, handleLike, openImagePopup);
  cardList.appendChild(card);
});

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

addButton.addEventListener("click", () => {
  newCardForm.reset();
  openModal(addPopup);
});

closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.addEventListener("mousedown", handleOverlayClick));

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const card = createCard(newCard, cardDelete, handleLike, openImagePopup);
  cardList.prepend(card);
  closeModal(addPopup);
  newCardForm.reset();
});
