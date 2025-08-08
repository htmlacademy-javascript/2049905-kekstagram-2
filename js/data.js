import { getRandomInteger, createIdGenerator, getRandomArrayElement } from './util.js';

const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const CommentsCount = {
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

const generatePhotoId = createIdGenerator();

const generateComments = () => {
  const generateCommentId = createIdGenerator();
  const commentsCount = getRandomInteger(CommentsCount.MIN, CommentsCount.MAX);
  return Array.from({ length: commentsCount }, () => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENTS)).join(' '),
    name: getRandomArrayElement(NAMES)
  }));
};

const generatePhoto = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
    comments: generateComments()
  };
};

const photos = Array.from({ length: PHOTO_COUNT }, generatePhoto);

export { photos };
