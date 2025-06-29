// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


import './pages/index.css'; 
import { initialCards } from './components/cards.js';
// import { createCard } from './components/card.js';
// import { openModal, closeModal } from './components/modal.js';

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

function createCard(cardData, cardDelete, handleLike) {
  const cardElements = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElements.querySelector(".card__image");
  const cardTitle = cardElements.querySelector(".card__title");
  const deleteButton = cardElements.querySelector(".card__delete-button");
  const likeButton = cardElements.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", function () {
    cardDelete(cardElements);
  });


  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });



  // Открытие картинки в попапе
  cardImage.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  return cardElements;
}

function cardDelete(cardElements) {
  cardElements.remove();
}

function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

initialCards.forEach(function (cardData) {
  const card = createCard(cardData, cardDelete, handleLike);
  cardList.appendChild(card);
});

// Модалки
function openModal(popup) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

// Элементы попапов и кнопок
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup));
});

document.querySelectorAll('.popup').forEach(popup =>
  popup.addEventListener('mousedown', handleOverlayClick)
);

// Форма редактирования профиля
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements['name'];
const jobInput = formElement.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
});

// Форма новой карточки
const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.elements['place-name'];
const placeLinkInput = newCardForm.elements['link'];

addButton.addEventListener('click', () => {
  newCardForm.reset();
  openModal(addPopup);
});

newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  const card = createCard(newCard, cardDelete);
  cardList.prepend(card);
  closeModal(addPopup);
  newCardForm.reset();
});
