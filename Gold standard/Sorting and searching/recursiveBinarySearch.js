var MIN_INT_NUMBER = 0;
var MAX_INT_NUMBER = 10;
var ARRAY_LENGTH = 10;

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

function createSortedIntNumbersArrayByLength(length){
	var array = [];
	var index = 0;
	
	while(index < length){
		array.push(getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER));
		index++;
	}

	return array.sort(function(a, b){ return a - b; });
}

Array.prototype.recursiveBinarySearch = function(start, end, num){
	if(start > end) return -1;
	var i = Math.floor(start / 2 + end / 2);
	if(num === this[i]) return i;
	if(num < this[i]) return this.recursiveBinarySearch(start, i - 1, num);
	if(num > this[i]) return this.recursiveBinarySearch(i + 1, end, num);
}

function main(){
	var arr = createSortedIntNumbersArrayByLength(ARRAY_LENGTH);
	var num = getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER);
	var i = arr.recursiveBinarySearch(0, arr.length - 1, num);

	console.log(arr.join(' '));
	console.log(num);
	console.log(i);
}
