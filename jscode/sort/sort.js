function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  return array;
}
class Sort {
  constructor() {
    this.array = [6, 3, 1, 4, 5, 2, 9, 8, 7, 10];
  }
  bubbleSort() {
    let sortArr = [...this.array];
    for (var i = 0; i < sortArr.length - 1; i++) {
      for (var j = i; j < sortArr.length; j++) {
        if (sortArr[j] < sortArr[i]) {
          swap(sortArr, j, i);
        }
      }
    }
    return sortArr;
  }
  selectionSort() {
    let sortArr = [...this.array];
    for (var i = 0; i < sortArr.length - 1; i++) {
      let indexMin = i;
      for (var j = i; j < sortArr.length; j++) {
        if (sortArr[indexMin] > sortArr[j]) {
          indexMin = j;
        }
      }
      swap(sortArr, indexMin, i);
    }
    return sortArr;
  }
  insertionSort() {
    let sortArr = [...this.array];
    for (var i = 0; i < sortArr.length; i++) {
      let j = i;
      while (j > 0) {
        if (sortArr[j] < sortArr[j - 1]) {
          swap(sortArr, j, j - 1);
        }
        j--;
      }
    }
    return sortArr;
  }
  mergeSort() {
    let sortArr = [...this.array];
    sortArr = this._mergeSort(sortArr);
    return sortArr;
  }
  _mergeSort(sortArr) {
    if (sortArr.length === 1) {
      return sortArr;
    }
    function merge(larr, rarr) {
      let result = [], lt = 0, rt = 0;
      while (larr.length > lt && rarr.length > rt) {
        if (larr[lt] > rarr[rt]) {
          result.push(larr[lt++]);
        } else {
          result.push(rarr[rt++]);
        }
      }
      while (larr.length > lt) {
        result.push(larr[lt++]);
      }
      while (rarr.length > rt) {
        result.push(rarr[rt++]);
      }
      return result;
    }
    let middleIndex = Math.floor(sortArr.length / 2);
    let leftArr, rightArr;
    leftArr = sortArr.slice(0, middleIndex);
    rightArr = sortArr.slice(middleIndex);
    return merge(this._mergeSort(leftArr), this._mergeSort(rightArr));
  }
  quickSort() {
    let sortArr = [...this.array];
    sortArr = this._quick(sortArr, 0, sortArr.length - 1);
    return sortArr;
  }
  _quick(array, left, right) {
    function partition(array, left, right) {
      let pivot = array[Math.floor((left + right) / 2)], i = left, j = right;
      while (i <= j) {
        while (array[i] < pivot) {
          i++;
        }
        while (array[j] > pivot) {
          j--;
        }
        if (i <= j) {
          swap(array, i, j);
          i++;
          j--;
        }
      }
      return i;
    }
    let index;
    if (array.length > 1) {
      index = partition(array, left, right);
      if (left < index - 1) {
        this._quick(array, left, index - 1);
      }
      if (index < right) {
        this._quick(array, index, right);
      }
    }
    return array;
  }
}
let sort = new Sort();
console.log(sort.quickSort());
