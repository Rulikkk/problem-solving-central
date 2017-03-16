/**
 * Binary search for item in an array. Returns index of some (not necessarily first) item.
 * @param {Number} num - Number to search.
 * @param {Number?} start - Start index to search. Optional.
 * @param {Number?} end - End index to search. Optional.
 * @returns {Number} Index of item if found, `-1` otherwise.
 */
Array.prototype.recursiveBinarySearch = function(num, start, end) {
  let rec = (start, end) => {
    if (start > end) return -1;
    let i = Math.floor(start / 2 + end / 2);
    if (num === this[i]) return i;
    if (num < this[i]) return rec(start, i - 1);
    if (num > this[i]) return rec(i + 1, end);
  };

  return rec(start || 0, end || this.length - 1);
};

const MIN_INT_NUMBER = 0, MAX_INT_NUMBER = 10, ARRAY_LENGTH = 10;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createSortedIntNumbersArrayByLength(length) {
  let array = [], index = 0;

  while (index < length) {
    array.push(getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER));
    index++;
  }

  return array.sort();
}

function main() {
  let arr = createSortedIntNumbersArrayByLength(ARRAY_LENGTH),
    num = getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER),
    i = arr.recursiveBinarySearch(num);

  console.log((i === -1 && arr.indexOf(num) === -1) || num === arr[i]);
}

