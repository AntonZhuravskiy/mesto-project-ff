const POPUP_OPENED_CLASS = "popup_is-opened";
const ESCAPE_KEY = "Escape";

export function openModal(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === ESCAPE_KEY) {
    const openedPopup = document.querySelector(`.${POPUP_OPENED_CLASS}`);
    if (openedPopup) closeModal(openedPopup);
  }
}

export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}
