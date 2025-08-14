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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.keyCode === 27;

export { getRandomInteger, createIdGenerator, getRandomArrayElement, isEscapeKey };
