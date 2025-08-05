const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;

const LIKES_COUNT = {
  MIN: 15,
  MAX: 200
};

const COMMENTS_COUNT = {
  MIN: 0,
  MAX: 30
};

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Скирк',
  'Мавуика'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Девушка идёт по берегу моря на закате.',
  'Кот спит на подоконнике рядом с книгой.',
  'Чашка кофе на деревянном столе.',
  'Уличный фонарь в тумане ночью.',
  'Лесная тропа среди зелёных деревьев.',
  'Вид из окна на город после дождя.',
  'Молодой человек работает за ноутбуком.',
  'Тарелка с пастой и бокалом вина.',
  'Руки держат букет полевых цветов.',
  'Велосипед стоит у стены с граффити.'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let currentId = 1;
  return () => currentId++;
};

const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = () => {
  const commentsCount = getRandomInteger(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX);
  return Array.from({ length: commentsCount }, () => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENTS)).join(' '),
    name: getRandomArrayElement(NAMES)
  }));
};

const generatePhotoDescription = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
    comments: generateComments()
  };
};

const photoDescription = Array.from({ length: PHOTO_COUNT }, generatePhotoDescription);

window.console.log(photoDescription);
