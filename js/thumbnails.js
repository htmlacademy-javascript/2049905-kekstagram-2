import { showBigPicture } from './fullsize-picture.js';

const drawThumbnails = (items) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosContainer = document.querySelector('.pictures');
  const photosListFragment = document.createDocumentFragment();

  items.forEach(({url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photosListFragment.appendChild(photoElement);

    photoElement.addEventListener('click', () => {
      showBigPicture({url, description, likes, comments});
    });
  });

  photosContainer.appendChild(photosListFragment);
};

export { drawThumbnails };
