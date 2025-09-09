import { isEscapeKey } from './util.js';
import { validateImgUploadForm } from './validator.js';
import { configureSlider } from './slider.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './notifications.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ScaleValue = {
  default: 100,
  max: 100,
  min: 25,
  step: 25
};

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCloser = document.querySelector('.img-upload__cancel');
const imgPreview = document.querySelector('.img-upload__preview img');
const scaleValueInput = document.querySelector('.scale__control--value');
const btnSmallerImg = document.querySelector('.scale__control--smaller');
const btnBiggerImg = document.querySelector('.scale__control--bigger');
const btnSubmit = document.querySelector('.img-upload__submit');
const pageBody = document.querySelector('body');

const validatorUploadForm = validateImgUploadForm(imgUploadForm);

let currentScale = ScaleValue.default;
let isSubmitting = false;

const updateScale = (value) => {
  currentScale = value;
  scaleValueInput.value = `${currentScale}%`;
  imgPreview.style.transform = `scale(${currentScale / 100})`;
};

const onBtnBiggerImgClick = () => {
  if (currentScale < ScaleValue.max) {
    updateScale(currentScale + ScaleValue.step);
  }
};

const onBtnSmallerImgClick = () => {
  if (currentScale > ScaleValue.min) {
    updateScale(currentScale - ScaleValue.step);
  }
};

const pushImgPreview = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

const openImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  pushImgPreview();
  document.addEventListener('keydown', onDocumentEscKeydown);
};

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  imgUploadForm.reset();
  validatorUploadForm.reset();
  updateScale(ScaleValue.default);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description') &&
    !document.querySelector('.error__inner') && !isSubmitting) {
    closeImgUploadOverlay();
  }
}

const onImgUploadInputChange = () => {
  openImgUploadOverlay();
};

const onImgUploadCloserClick = () => {
  if (!isSubmitting) {
    closeImgUploadOverlay();
  }
};

const openImgUploadForm = () => {
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadCloser.addEventListener('click', onImgUploadCloserClick);
  btnBiggerImg.addEventListener('click', onBtnBiggerImgClick);
  btnSmallerImg.addEventListener('click', onBtnSmallerImgClick);

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (validatorUploadForm.validate()) {
      btnSubmit.disabled = true;
      isSubmitting = true;

      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          closeImgUploadOverlay();
          showSuccessMessage();
        })
        .catch(() => showErrorMessage())
        .finally(() => {
          btnSubmit.disabled = false;
          isSubmitting = false;
        });
    }
  });

  configureSlider();
};

export { openImgUploadForm };
