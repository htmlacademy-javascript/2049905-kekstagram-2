import { showBigPicture } from './fullsize-picture.js';
import { initFilters } from './filters.js';

const photosContainer = document.querySelector('.pictures');

const drawThumbnails = (items) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosListFragment = document.createDocumentFragment();

  items.forEach(({url, description, likes, comments}) => {
    const photo = photoTemplate.cloneNode(true);
    const photoImg = photo.querySelector('.picture__img');
    photoImg.src = url;
    photoImg.alt = description;
    photo.querySelector('.picture__comments').textContent = comments.length;
    photo.querySelector('.picture__likes').textContent = likes;
    photosListFragment.append(photo);

    photo.addEventListener('click', () => {
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
