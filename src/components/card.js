

import { deleteCardFromServer, likeCard, unlikeCard } from "./api.js";

// Удаление карточки с сервера
export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error('Ошибка удаления карточки:', err);
    });
}

// Обработка лайка / дизлайка с обновлением счетчика
export function handleLike(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? unlikeCard : likeCard;

  method(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
}

// Создание карточки
export function createCard({
  cardData,
  cardDelete,
  handleLike,
  openImagePopup,
  userId,
}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      cardDelete(cardElement, cardData._id)
    );
  } else {
    deleteButton.style.display = "none";
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeCount.textContent = cardData.likes.length;

  likeButton.addEventListener("click", () =>
    handleLike(likeButton, cardData._id, likeCount)
  );

  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return cardElement;
}
