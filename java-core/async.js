//sync 1 -> 2 -> 3 -> 4-> 5

//async
/*
1 ->
2 ->
3 ->
*/
//JS https://www.jsv9000.app/

//Promise - it is object

const myPromise = new Promise((resolve, reject) => {
  const result = true;

  if (result) {
    resolve('Success operation');
  } else {
    reject('failed operation');
  }
});

myPromise.then((value)=> value)
