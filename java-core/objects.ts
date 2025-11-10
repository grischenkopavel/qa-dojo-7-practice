const student = {
  fullName: 'Pavlo Hryshchenko',
  age: 43,
  diplomas: ['Teacher of physic and mathematic'],
  study: () => console.log('I am studying'),
  getMyDiploma: () => student.diplomas,
};

console.log(typeof student);

console.log(student.getMyDiploma());

for (const key in student) {
  console.log(key);
}
