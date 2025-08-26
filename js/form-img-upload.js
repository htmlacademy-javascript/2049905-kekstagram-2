import { isEscapeKey } from './util.js';
import { validateImgUploadForm } from './validator.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCloser = document.querySelector('.img-upload__cancel');
const pageBody = document.querySelector('body');

const validatorUploadForm = validateImgUploadForm(imgUploadForm);

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  imgUploadForm.reset();
  validatorUploadForm.reset();
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    closeImgUploadOverlay();
  }
}

function onImgUploadCloserClick() {
  closeImgUploadOverlay();
}

const onImgUploadInputChange = () => {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const changeImgUploadForm = () => {
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadCloser.addEventListener('click', onImgUploadCloserClick);
};

export { changeImgUploadForm };
