import { drawThumbnails, clearThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_THUMBNAILS_COUNT = 10;
const BUTTON_ACTIVE = 'img-filters__button--active';

const imgFilters = document.querySelector('.img-filters');
const btnFilterDefault = imgFilters.querySelector('#filter-default');
const btnFilterRandom = imgFilters.querySelector('#filter-random');
const btnFilterDiscussed = imgFilters.querySelector('#filter-discussed');

let defaultThumbnails = [];

const debounceRender = debounce((thumbnails) => {
  clearThumbnails();
  drawThumbnails(thumbnails);
}, RERENDER_DELAY);

const changeFilter = (btnFilter) => {
  const activeFilter = imgFilters.querySelector(`.${BUTTON_ACTIVE}`);
  activeFilter.classList.remove(BUTTON_ACTIVE);
  btnFilter.classList.add(BUTTON_ACTIVE);
};

const onBtnFilterDefault = () => {
  changeFilter(btnFilterDefault);
  debounceRender(defaultThumbnails);
};

const onBtnFilterRandom = () => {
  const randomThumbnails = defaultThumbnails.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_THUMBNAILS_COUNT);

  changeFilter(btnFilterRandom);
  debounceRender(randomThumbnails);
};

const onBtnFilterDiscussed = () => {
  const discussedThumbnails = defaultThumbnails.slice().sort((a, b) => b.comments.length - a.comments.length);

  changeFilter(btnFilterDiscussed);
  debounceRender(discussedThumbnails);
};

const initFilters = (items) => {
  defaultThumbnails = items.slice();

  imgFilters.classList.remove('img-filters--inactive');

  btnFilterDefault.addEventListener('click', onBtnFilterDefault);
  btnFilterRandom.addEventListener('click', onBtnFilterRandom);
  btnFilterDiscussed.addEventListener('click', onBtnFilterDiscussed);
};

export { initFilters };
