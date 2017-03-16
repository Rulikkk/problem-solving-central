var MIN_INT_NUMBER = 0;
var MAX_INT_NUMBER = 10;
var ARRAY_LENGTH = 10;

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

function createSortedIntNumbersArrayByLength(length){
	var array = [];
	var i = 0;
	
	while(i < length){
		array.push(getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER));
		i++;
	}

	return array.sort(function(a, b){ return a - b; });
}

Array.prototype.recursiveBinarySearch = function(num){
	var start = 0;
	var end = this.length - 1;
	var i;
	while(start <= end){
		i = Math.floor((start + end)/2);
		if(num === this[i]){
			return i;
		}
		if(num < this[i]){
			end = i - 1;
		}
		if(num > this[i]){
			start = i + 1;
		}
	}

	return -1;
}

function main(){
	var arr = createSortedIntNumbersArrayByLength(ARRAY_LENGTH);
	var num = getRandomInt(MIN_INT_NUMBER, MAX_INT_NUMBER);
	var i = arr.recursiveBinarySearch(num);

	console.log(arr.join(' '));
	console.log(num);
	console.log(i);
}
