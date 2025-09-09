import { showBigPicture } from './fullsize-picture.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_THUMBNAILS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const photosContainer = document.querySelector('.pictures');
const btnFilterDefault = imgFilters.querySelector('#filter-default');
const btnFilterRandom = imgFilters.querySelector('#filter-random');
const btnFilterDiscussed = imgFilters.querySelector('#filter-discussed');

let defaultThumbnails = [];

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

  return items;
};

const clearThumbnails = () => {
  photosContainer.querySelectorAll('.picture').forEach((el) => el.remove());
};

function showThumbnails(items) {
  defaultThumbnails = items.slice();

  drawThumbnails(defaultThumbnails);

  imgFilters.classList.remove('img-filters--inactive');

  btnFilterDefault.addEventListener('click', onBtnFilterDefault);
  btnFilterRandom.addEventListener('click', onBtnFilterRandom);
  btnFilterDiscussed.addEventListener('click', onBtnFilterDiscussed);
}

function changeFilter(filterBtn) {
  const activeFilter = imgFilters.querySelector('.img-filters__button--active');
  if (activeFilter) {
    activeFilter.classList.remove('img-filters__button--active');
  }
  filterBtn.classList.add('img-filters__button--active');
}

function onBtnFilterDefault() {
  clearThumbnails();
  drawThumbnails(defaultThumbnails);
  changeFilter(btnFilterDefault);
}

function onBtnFilterRandom() {
  clearThumbnails();
  const randomThumbnails = defaultThumbnails.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_THUMBNAILS_COUNT);
  drawThumbnails(randomThumbnails);
  changeFilter(btnFilterRandom);
}

function onBtnFilterDiscussed() {
  clearThumbnails();
  const discussedThumbnails = defaultThumbnails.slice().sort((a, b) => b.comments.length - a.comments.length);
  drawThumbnails(discussedThumbnails);
  changeFilter(btnFilterDiscussed);
}

export { showThumbnails };
