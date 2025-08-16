import { isEscapeKey } from './util.js';

const COMMENTS_PER_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsShowCounter = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const pageBody = document.querySelector('body');
let allComments = [];
let commentsShown = 0;

function onCloseClick() {
  commentsShown = 0;

  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeyDown);
  bigPicture.removeEventListener('click', onOverlayClick);
  bigPictureClose.removeEventListener('click', onCloseClick);
  commentsLoader.removeEventListener('click', onLoaderClick);
}

function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    onCloseClick();
  }
}

function onOverlayClick(evt) {
  if (evt.target === bigPicture) {
    onCloseClick();
  }
}

function onLoaderClick() {
  loadMoreComments();
}

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarComment = document.createElement('img');
  avatarComment.classList.add('social__picture');
  avatarComment.src = avatar;
  avatarComment.alt = name;
  avatarComment.width = 35;
  avatarComment.height = 35;

  const messageComment = document.createElement('p');
  messageComment.classList.add('social__text');
  messageComment.textContent = message;

  commentElement.append(avatarComment, messageComment);

  return commentElement;
};

function loadMoreComments() {
  const fragment = document.createDocumentFragment();
  const moreComments = allComments.slice(commentsShown, commentsShown + COMMENTS_PER_LOAD);

  moreComments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsList.append(fragment);
  commentsShown += moreComments.length;
  commentsShowCounter.textContent = commentsShown;

  if (commentsShown === allComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

const showBigPicture = ({ url, description, likes, comments }) => {
  pageBody.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  allComments = comments;

  loadMoreComments();

  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onEscKeyDown);
  bigPicture.addEventListener('click', onOverlayClick);
  bigPictureClose.addEventListener('click', onCloseClick);
  commentsLoader.addEventListener('click', onLoaderClick);
};

export { showBigPicture };
