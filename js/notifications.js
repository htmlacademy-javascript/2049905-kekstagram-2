import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const templateError = document.querySelector('#error').content.querySelector('.error');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');

const showAlert = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const removeAlert = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeAlert();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target === message) {
      removeAlert();
    }
  }

  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  return { message, removeAlert };
};

const showDataErrorMessage = () => {
  const { removeAlert } = showAlert(templateDataError);
  setTimeout(removeAlert, ALERT_SHOW_TIME);
};

const showErrorMessage = () => {
  const { message, removeAlert } = showAlert(templateError);
  const btnAlertError = message.querySelector('.error__button');
  if (btnAlertError) {
    btnAlertError.addEventListener('click', () => removeAlert());
  }
};

const showSuccessMessage = () => {
  const { message, removeAlert } = showAlert(templateSuccess);
  const btnAlertSuccess = message.querySelector('.success__button');
  if (btnAlertSuccess) {
    btnAlertSuccess.addEventListener('click', () => removeAlert());
  }
};

export { showDataErrorMessage, showErrorMessage, showSuccessMessage };
