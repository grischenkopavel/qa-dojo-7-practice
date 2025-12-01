const product = {
  name: 'Notebook',
  brand: 'Dell',
  price: 1200,
  inStock: true,
};

const extended = {
  active: true,
  promotion: '20%',
};

console.log(Object.keys(product));
console.log(Object.values(product));
console.log(Object.entries(product));

//concat objects
//Rest operator
const concatObj = { ...product, ...extended };
console.log(concatObj);

//Object assign - concatenation of several objects
const objAssign = Object.assign(product, extended);

console.log(objAssign);
console.log(product);
console.log(extended);

//hasOwn check property exist for the object
console.log(Object.hasOwn(product, 'inStock'));


