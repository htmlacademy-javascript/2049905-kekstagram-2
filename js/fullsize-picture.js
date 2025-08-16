import { isEscapeKey } from './util.js';

const COMMENTS_PER_LOAD = 5;

const pageBody = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloser = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsShowCounter = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let allComments = [];
let shownComments = 0;

const closeBigPicture = () => {
  shownComments = 0;

  bigPicture.classList.toggle('hidden');
  pageBody.classList.toggle('modal-open');

  document.removeEventListener('keydown', onDocumentEscKeydown);
  bigPictureCloser.removeEventListener('click', onBigPictureCloserClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

function onBigPictureCloserClick() {
  closeBigPicture();
}

function onCommentsLoaderClick() {
  loadMoreComments();
}

const createCommentElement = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const avatarComment = document.createElement('img');
  avatarComment.classList.add('social__picture');
  avatarComment.src = avatar;
  avatarComment.alt = name;
  avatarComment.width = 35;
  avatarComment.height = 35;

  const messageComment = document.createElement('p');
  messageComment.classList.add('social__text');
  messageComment.textContent = message;

  comment.append(avatarComment, messageComment);

  return comment;
};

function loadMoreComments() {
  const fragment = document.createDocumentFragment();
  const moreComments = allComments.slice(shownComments, shownComments + COMMENTS_PER_LOAD);

  moreComments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  commentsList.append(fragment);
  shownComments += moreComments.length;
  commentsShowCounter.textContent = shownComments;
  commentsLoader.classList.toggle('hidden', shownComments === allComments.length);
}

const showBigPicture = ({ url, description, likes, comments }) => {
  pageBody.classList.toggle('modal-open');
  bigPicture.classList.toggle('hidden');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  allComments = comments;

  loadMoreComments();

  document.addEventListener('keydown', onDocumentEscKeydown);
  bigPictureCloser.addEventListener('click', onBigPictureCloserClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { showBigPicture };
