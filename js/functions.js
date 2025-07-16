//   Задание 1

console.log('Задание 1');
const checkLengthString = (testString, maxLength) => testString.length <= maxLength;
console.log(checkLengthString('проверяемая строка', 20));
console.log(checkLengthString('проверяемая строка', 18));
console.log(checkLengthString('проверяемая строка', 10));

//   Задание 2

console.log('Задание 2');
const checkPalindrom = (testString) => {
  const normalizeString = testString.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < normalizeString.length / 2; i++) {
    if (normalizeString[i] !== normalizeString[normalizeString.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(checkPalindrom('топот'));
console.log(checkPalindrom('ДовОд'));
console.log(checkPalindrom('Кекс'));
console.log(checkPalindrom('Лёша на полке клопа нашёл '));

//   Задание 3

console.log('Задание 3');
const getNumber = (testString) => {
  const normalizeString = testString.toString();
  let str = '';
  for (let i = 0; i < normalizeString.length; i++) {
    const num = parseInt(normalizeString[i], 10);
    if (!Number.isNaN(num)) {
      str += num;
    }
  }
  return str ? parseInt(str, 10) : NaN;
};

console.log(getNumber('2023 год'));
console.log(getNumber('ECMAScript 2022'));
console.log(getNumber('1 кефир, 0.5 батона'));
console.log(getNumber('агент 007'));
console.log(getNumber('а я томат'));
console.log(getNumber('2023'));
console.log(getNumber('-1'));
console.log(getNumber('1.5'));
