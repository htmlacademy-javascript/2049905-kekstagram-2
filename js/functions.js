//   Задание 1

window.console.log('Задание 1');
const checkLengthString = (testString, maxLength) => testString.length <= maxLength;
window.console.log(checkLengthString('проверяемая строка', 20));
window.console.log(checkLengthString('проверяемая строка', 18));
window.console.log(checkLengthString('проверяемая строка', 10));

//   Задание 2

window.console.log('Задание 2');
const checkPalindrom = (testString) => {
  const normalizeString = testString.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < normalizeString.length / 2; i++) {
    if (normalizeString[i] !== normalizeString[normalizeString.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

window.console.log(checkPalindrom('топот'));
window.console.log(checkPalindrom('ДовОд'));
window.console.log(checkPalindrom('Кекс'));
window.console.log(checkPalindrom('Лёша на полке клопа нашёл '));

//   Задание 3

window.console.log('Задание 3');
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

window.console.log(getNumber('2023 год'));
window.console.log(getNumber('ECMAScript 2022'));
window.console.log(getNumber('1 кефир, 0.5 батона'));
window.console.log(getNumber('агент 007'));
window.console.log(getNumber('а я томат'));
window.console.log(getNumber('2023'));
window.console.log(getNumber('-1'));
window.console.log(getNumber('1.5'));
