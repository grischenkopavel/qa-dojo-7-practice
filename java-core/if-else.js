console.log('Hi');
//task with age
const age = 17;
console.log(age >= 18);
if (age >= 21) {
  console.log('Allow, and alcohol');
} else if (age < 18) {
  console.log('Deny, no alcohol');
} else if (age >= 18 && age < 21) {
  console.log('allow, no alcohol');
}

//task with temperature
const currentTemperature = 11;
if (currentTemperature < 10) {
  console.log('cold');
} else if (currentTemperature > 10) {
  console.log('Hot');
}

function isEven(numToCheckIfEven) {
  if (typeof numToCheckIfEven == 'number' && !Number.isNaN(numToCheckIfEven)) {
    return numToCheckIfEven % 2 === 0;
  } else {
    console.error('Wrong input');
    return NaN;
  }
}

console.log(isEven(-Infinity));
console.log(Infinity % 2);
