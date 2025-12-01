//map - do not change array length
console.log([1, 2, undefined, 4].length);

const arrayWithoutUndefined = [1, 2, undefined, 4].map((value) => {
  if (typeof value !== 'undefined') {
    return value;
  }
  return '';
});

console.log(arrayWithoutUndefined);

const array = [1, 2, undefined, 4];

const arrayFiltered = array.filter((value) => {
  if (typeof value !== 'undefined') {
    return value;
  }
});

console.log(arrayFiltered);

//find
const result = [2, 5, 8, 9].find((value) => {
  return value === 5;
});

console.log(result);

//findIndex
const findIndex = [1, 2, 3, 4].findIndex((value) => {
  return value === 3;
});
console.log(findIndex)

//some
const someResult = [1, 2, 3, 4].some((value) => {
  return value === 5;
});

console.log(someResult);

//every
const someEvery = [5, 5, 5, 5].some((value) => {
  return value === 5;
});

console.log(someEvery);

//includes works with primitives
const includes = [4, '5', 6, false].includes(false)
console.log(includes)
