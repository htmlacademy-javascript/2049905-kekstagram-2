const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const templateError = document.querySelector('#error').content.querySelector('.error');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');

const showAlert = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const remove = () => {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      remove();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target === message) {
      remove();
    }
  }

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);

  return { message, remove };
};

const showDataErrorMessage = () => {
  const { remove } = showAlert(templateDataError);
  setTimeout(remove, ALERT_SHOW_TIME);
};

const showErrorMessage = () => {
  const { message, remove } = showAlert(templateError);
  const btnAlertError = message.querySelector('.error__button');
  if (btnAlertError) {
    const onClick = () => {
      remove();
      btnAlertError.removeEventListener('click', onClick);
    };
    btnAlertError.addEventListener('click', onClick);
  }
};

const showSuccessMessage = () => {
  const { message, remove } = showAlert(templateSuccess);
  const btnAlertSuccess = message.querySelector('.success__button');
  if (btnAlertSuccess) {
    const onClick = () => {
      remove();
      btnAlertSuccess.removeEventListener('click', onClick);
    };
    btnAlertSuccess.addEventListener('click', onClick);
  }
};

export { isEscapeKey, showDataErrorMessage, showErrorMessage, showSuccessMessage };
