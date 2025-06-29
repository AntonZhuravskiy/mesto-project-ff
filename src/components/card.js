export function createCard(cardData, cardDelete, handleLike, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => cardDelete(cardElement));
  likeButton.addEventListener("click", () => handleLike(likeButton));
  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return cardElement;
}

export function cardDelete(cardElement) {
  cardElement.remove();
}

export function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
