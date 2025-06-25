// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

function createCard(cardData, cardDelete) {
  const cardElements = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElements.querySelector(".card__image");
  const cardTitle = cardElements.querySelector(".card__title");
  const deleteButton = cardElements.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", function () {
    cardDelete(cardElements);
  });

  return cardElements;
}

function cardDelete(cardElements) {
  cardElements.remove();
}

initialCards.forEach(function (cardData) {
  const card = createCard(cardData, cardDelete);
  cardList.appendChild(card);
});