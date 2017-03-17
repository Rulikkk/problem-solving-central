/**
 * Binary search for item in an array. Returns index of some (not necessarily first) item.
 * @param {Number} num - Number to search.
 * @returns {Number} Index of item if found, `-1` otherwise.
 */
Array.prototype.binarySearch = function(num) {
  let start = 0, end = this.length - 1, i;
  while (start <= end) {
    i = Math.floor(start / 2 + end / 2);
    if (num === this[i]) {
      return i;
    }
    if (num < this[i]) {
      end = i - 1;
    }
    if (num > this[i]) {
      start = i + 1;
    }
  }

  return -1;
};

const MIN_INT_NUMBER = 0, MAX_INT_NUMBER = 10, ARRAY_LENGTH = 10;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function createSortedIntNumbersArrayByLength(length) {
  let array = [], i = 0;
  while (i < length) {
    array.push(getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER));
    i++;
  }

  return array.sort();
};

function main() {
  let arr = createSortedIntNumbersArrayByLength(ARRAY_LENGTH),
    num = getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER),
    i = arr.binarySearch(num);

  console.log((i === -1 && arr.indexOf(num) === -1) || num === arr[i]);
};
