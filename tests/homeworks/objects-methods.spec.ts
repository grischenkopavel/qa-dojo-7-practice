import { test, expect } from '@playwright/test';
//cSpell: disable
/*
 Виведіть тільки name (у масиві) по одному співробітнику з кожної з існуючих position, 
 чий досвід роботи три або більше років
*/
interface Employee {
  name: string;
  experience: number;
  position: string;
}

let employees: Employee[] = [
  { name: 'Олександр Петренко', experience: 5, position: 'Розробник' },
  { name: 'Марія Коваленко', experience: 3, position: 'Дизайнер' },
  { name: 'Іван Сидоренко', experience: 7, position: 'Менеджер проектів' },
  { name: 'Анна Мельник', experience: 5, position: 'Тестувальник' },
  { name: 'Сергій Бондаренко', experience: 4, position: 'Аналітик' },
  { name: 'Катерина Шевченко', experience: 6, position: 'Архітектор' },
  { name: 'Олександр Гриценко', experience: 3, position: 'DevOps інженер' },
  { name: 'Олександр Петрик', experience: 5, position: 'Розробник' },
  { name: 'Лія Ковалі', experience: 2, position: 'Дизайнер' },
  { name: 'Борис Сидоренко', experience: 1, position: 'Менеджер проектів' },
  { name: 'Ганна Мука', experience: 1, position: 'Тестувальник' },
  { name: 'Сергій Бонд', experience: 15, position: 'Аналітик' },
  { name: 'Кейт Шева', experience: 2, position: 'Архітектор' },
  { name: 'Яків Грицько', experience: 3, position: 'DevOps інженер' },
];

const expectedResult: Array<string> = [
  'Олександр',
  'Марія',
  'Іван',
  'Анна',
  'Сергій',
  'Катерина',
  'Олександр',
];

const filteredMoreThanThreeYears: Employee[] = employees.filter((value) => {
  if (value.experience >= 3) {
    return value;
  }
});

//console.log(filteredMoreThanThreeYears);

const filteredByUniquePosition: Employee[] = [];
const uniquePosition: Array<string> = [];
for (const employee of filteredMoreThanThreeYears) {
  if (uniquePosition.includes(employee.position)) {
    continue;
  }
  uniquePosition.push(employee.position);
  filteredByUniquePosition.push(employee);
}

const result: Array<string> = filteredByUniquePosition.map((employee) => {
  return employee.name.split(' ')[0];
});

console.log(filteredByUniquePosition);
console.log(uniquePosition);
console.log(result);

test(
  'Filtering check',
  {
    tag: ['@JSCore'],
    annotation: {
      type: 'description',
      description:
        'Filtered array should display only values {Олександр Петренко, Іван Сидоренко}',
    },
  },
  async () => {
    expect(result).toMatchObject(expectedResult)
  }
);
//cSpell: enable
