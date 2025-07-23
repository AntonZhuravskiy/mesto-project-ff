function showError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideError(form, input, config) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
  const pattern = /^[А-Яа-яЁёA-Za-z\s\-]+$/;
  const isTextInput = input.name === "name" || input.name === "place-name";

  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config);
  } else if (isTextInput && !pattern.test(input.value)) {
    const message = input.dataset.errorMessage || "Недопустимый формат";
    showError(form, input, message, config);
  } else {
    hideError(form, input, config);
  }
}

function hasInvalidInput(inputs, config) {
  return inputs.some((input) => {
    const isTextInput = input.name === "name" || input.name === "place-name";
    const pattern = /^[А-Яа-яЁёA-Za-z\s\-]+$/;
    return !input.validity.valid || (isTextInput && !pattern.test(input.value));
  });
}

function toggleButtonState(inputs, button, config) {
  if (hasInvalidInput(inputs, config)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });

  toggleButtonState(inputs, button, config); // при инициализации
}

export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => hideError(form, input, config));
  toggleButtonState(inputs, button, config);
}
