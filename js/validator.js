const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_AMOUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessage = {
  invalidHashtag: 'Введён невалидный хэштег! Хэштэг должен начинаться с символа # и не может содержать специальные символы!',
  tooManyHashtags: 'Превышено количество хэштегов!',
  tooLongHashtag: 'Максимальная длина хэштега 20 символов!',
  repeatedHashtags: 'Хэштеги повторяются!',
  commaUsed: 'Хэштеги должны быть разделены пробелами, без запятых!',
  hashOnly: 'Хэштег не может состоять только из символа #!',
  tooLongComment: 'Длина комментария больше 140 символов!'
};

const validateComment = (value) => value.trim().length <= MAX_COMMENT_LENGTH;

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);
  const lowercasedTags = [];

  if (!value.trim()) {
    return { valid: true, error: '' };
  }

  if (value.includes(',')) {
    return { valid: false, error: ErrorMessage.commaUsed };
  }

  if (hashtags.length > MAX_HASHTAG_AMOUNT) {
    return { valid: false, error: ErrorMessage.tooManyHashtags };
  }

  for (const hashtag of hashtags) {
    const lowerCaseHashtag = hashtag.toLowerCase();

    if (hashtag === '#') {
      return { valid: false, error: ErrorMessage.hashOnly };
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return { valid: false, error: ErrorMessage.tooLongHashtag };
    }

    if (!VALID_HASHTAG.test(hashtag)) {
      return { valid: false, error: ErrorMessage.invalidHashtag };
    }

    if (lowercasedTags.includes(lowerCaseHashtag)) {
      return { valid: false, error: ErrorMessage.repeatedHashtags };
    }
    lowercasedTags.push(lowerCaseHashtag);
  }

  return { valid: true, error: '' };
};

const validateImgUploadForm = (imgUploadForm) => {
  const pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'pristine-error'
  });

  const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
  const commentInput = imgUploadForm.querySelector('.text__description');

  pristine.addValidator(hashtagInput, (value) => validateHashtags(value).valid,
    (value) => validateHashtags(value).error);
  pristine.addValidator(commentInput, validateComment, ErrorMessage.tooLongComment);

  const onImgUploadFormSubmit = (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  };

  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);

  return pristine;
};

export { validateImgUploadForm };
