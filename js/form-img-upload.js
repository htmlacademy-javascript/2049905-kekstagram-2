import { isEscapeKey } from './util.js';
import { validateImgUploadForm } from './validator.js';
import { setupSlider } from './slider.js';

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
const pageBody = document.querySelector('body');

const validatorUploadForm = validateImgUploadForm(imgUploadForm);

let currentScale = ScaleValue.default;

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

const openImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
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
    !evt.target.classList.contains('text__description')) {
    closeImgUploadOverlay();
  }
}

const onImgUploadInputChange = () => {
  openImgUploadOverlay();
};

const onImgUploadCloserClick = () => {
  closeImgUploadOverlay();
};

const changeImgUploadForm = () => {
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadCloser.addEventListener('click', onImgUploadCloserClick);
  btnBiggerImg.addEventListener('click', onBtnBiggerImgClick);
  btnSmallerImg.addEventListener('click', onBtnSmallerImgClick);
  setupSlider();
};

export { changeImgUploadForm };
