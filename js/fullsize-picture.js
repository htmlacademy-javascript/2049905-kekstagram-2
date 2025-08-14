import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const pageBody = document.querySelector('body');

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onCloseClick();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target === bigPicture) {
    onCloseClick();
  }
};

const onCloseClick = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeyDown);
  bigPicture.removeEventListener('click', onOverlayClick);
  bigPictureClose.removeEventListener('click', onCloseClick);
};


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

  commentElement.appendChild(avatarComment);
  commentElement.appendChild(messageComment);

  return commentElement;
};

const showBigPicture = ({ url, description, likes, comments }) => {
  pageBody.classList.add('modal-open');
  const commentFragment = document.createDocumentFragment();

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';

  comments.forEach(comment => {
    commentFragment.appendChild(createCommentElement(comment));
  });

  commentsList.appendChild(commentFragment);

  bigPicture.classList.remove('hidden');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onEscKeyDown);
  bigPicture.addEventListener('click', onOverlayClick);
  bigPictureClose.addEventListener('click', onCloseClick);
};

export { showBigPicture };
