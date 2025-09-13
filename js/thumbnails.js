import { showBigPicture } from './fullsize-picture.js';
import { initFilters } from './filters.js';

const photosContainer = document.querySelector('.pictures');

const drawThumbnails = (items) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosListFragment = document.createDocumentFragment();

  items.forEach(({url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photosListFragment.append(photoElement);

    photoElement.addEventListener('click', () => {
      showBigPicture({url, description, likes, comments});
    });
  });

  photosContainer.append(photosListFragment);
};

const showThumbnails = (items) => {
  drawThumbnails(items);
  initFilters(items);
};

const clearThumbnails = () => {
  photosContainer.querySelectorAll('.picture')
    .forEach((item) => item.remove());
};

export { drawThumbnails, showThumbnails, clearThumbnails };
