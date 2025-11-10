import { test, expect } from '@playwright/test';

//cSpell:disable
/* 
1. Парне чи непарне число
Напишіть програму, яка визначає, чи число парне або непарне.
Вхід: Число (наприклад, 4)
Вихід:
- "Число парне."
- "Число непарне."
*/
//cSpell: enable

function isEven(numToCheckIfEven: number) {
  if (!Number.isNaN(numToCheckIfEven) && isFinite(numToCheckIfEven)) {
    return numToCheckIfEven % 2 === 0;
  } else {
    console.error(`Wrong input: ${numToCheckIfEven}`);
    throw new Error('Wrong input');
  }
}

test.describe(
  'Unit test for the isEven function',
  { tag: ['@JSCore'] },
  async () => {
    test(
      'IsEven:0001. Even number',
      {
        annotation: {
          type: 'description',
          description:
            'isEven function should return "true" for the even number',
        },
      },
      async () => {
        expect(isEven(4)).toBe(true);
      }
    );
    test(
      'IsEven:0002. Non even number',
      {
        annotation: {
          type: 'description',
          description:
            'isEven function should return "false" for the non even number',
        },
      },
      async () => {
        expect(isEven(5)).toBe(false);
      }
    );

    test(
      'IsEven:0003. Nan value',
      {
        annotation: {
          type: 'description',
          description:
            'isEven function should ThrowError for the Nan input value and "Wrong input" console log',
        },
      },
      async () => {
        expect(() => isEven(NaN)).toThrowError('Wrong input');
      }
    );
    test(
      'IsEven: 0004. Infinity',
      {
        annotation: {
          type: 'description',
          description:
            'isEven function should ThrowError for the Infinity input value and "Wrong input" console log',
        },
      },
      async () => {
        expect(() => isEven(Infinity)).toThrowError('Wrong input');
      }
    );
    test(
      'IsEven: 0005. -Infinity',
      {
        annotation: {
          type: 'description',
          description:
            'isEven function should ThrowError for the -Infinity input value and "Wrong input" console log',
        },
      },
      async () => {
        expect(() => isEven(-Infinity)).toThrowError('Wrong input');
      }
    );
    test(
      'IsEven: 0006. Zero',
      {
        annotation: {
          type: 'description',
          description:
            'isEven function should return "true" for the zero number',
        },
      },
      async () => {
        expect(isEven(0)).toBe(true);
      }
    );
  }
);

//cSpell: disable
/*
2. Привітання за часом
Залежно від часу доби, виведіть привітання: "Доброго ранку!", "Доброго дня!" або "Доброго вечора!".
Вхід: Година (наприклад, 15)
Вихід:
- Якщо год < 12: "Доброго ранку!"
- Якщо год 12–18: "Доброго дня!"
- Якщо год > 18: "Доброго вечора!"
*/
//cSpell: enable

function greeting(time: number) {
  if (!Number.isNaN(time)) {
    if (time >= 0 && time < 12) {
      return 'Good morning!';
    } else if (time >= 12 && time <= 18) {
      return 'Good afternoon!';
    } else if (time > 18 && time <= 24) {
      return 'Good evening!';
    } else {
      throw new Error(`Wrong input: ${time}`);
    }
  }
}
const greetingInput = {
  morning: 8,
  afternoon: 14,
  evening: 21,
  negativeTime: -1,
  outOfTimeRange: 25,
  zero: 0,
};
test.describe(
  'Unit test for the "greeting" function',
  { tag: ['@JSCore'] },
  async () => {
    test(
      'greeting-0001. Good morning case',
      {
        annotation: {
          type: 'description',
          description: `"greeting" function return "Good morning!" for the input time ${greetingInput.morning}`,
        },
      },
      async () => {
        expect(greeting(greetingInput.morning)).toBe('Good morning!');
      }
    );

    test(
      'greeting-0002. Good afternoon case',
      {
        annotation: {
          type: 'description',
          description: `"greeting" function return "Good afternoon!" for the input time ${greetingInput.afternoon}`,
        },
      },
      async () => {
        expect(greeting(greetingInput.afternoon)).toBe('Good afternoon!');
      }
    );

    test(
      'greeting-0003. Good evening case',
      {
        annotation: {
          type: 'description',
          description: `"greeting" function return "Good evening!" for the input time ${greetingInput.evening}`,
        },
      },
      async () => {
        expect(greeting(greetingInput.evening)).toBe('Good evening!');
      }
    );

    test(
      'greeting-0004. Negative time',
      {
        annotation: {
          type: 'description',
          description: `"greeting" function throw error "Wrong input" for the negative input time ${greetingInput.negativeTime}`,
        },
      },
      async () => {
        expect(() => greeting(greetingInput.negativeTime)).toThrowError(
          /Wrong input/
        );
      }
    );

    test(
      'greeting-0005. Out of 0 - 24 range case',
      {
        annotation: {
          type: 'description',
          description: `"greeting" function throw error "Wrong input" for the negative input time ${greetingInput.outOfTimeRange}`,
        },
      },
      async () => {
        expect(() => greeting(greetingInput.outOfTimeRange)).toThrowError(
          /Wrong input/
        );
      }
    );

    test(
      'greeting-0006. Zero case',
      {
        annotation: {
          type: 'description',
          description: `"greeting" function return "Good morning!" for the input time ${greetingInput.zero}`,
        },
      },
      async () => {
        expect(greeting(greetingInput.zero)).toBe('Good morning!');
      }
    );
  }
);

//csPell: disable
/*
3. Перевірка оцінки
Якщо бал >= 50 — "Тест складено".
Якщо < 50 — "Тест не складено".
Вхід: Бал (наприклад, 42)
*/
//csPell: enable

function scoreChecker(score: number) {
  if (score >= 50 && score <= 100) {
    return 'Test pass';
  } else if (score >= 0 && score < 50) {
    return 'Test fail';
  } else {
    throw new Error(`Wrong input: ${score}`);
  }
}
test('Unit test for the scoreChecker function', async () => {
  expect(scoreChecker(49)).toBe('Test fail');
  expect(scoreChecker(50)).toBe('Test pass');
  expect(scoreChecker(100)).toBe('Test pass');
  expect(() => scoreChecker(101)).toThrowError(/Wrong input/);
  expect(() => scoreChecker(-1)).toThrowError(/Wrong input/);
  expect(() => scoreChecker(NaN)).toThrowError(/Wrong input/);
  expect(() => scoreChecker(Infinity)).toThrowError(/Wrong input/);
});

//csPell: disable
/*
4. Вік для голосування
Напишіть програму, яка перевіряє, чи можна користувачу голосувати.
Вхід: Вік (наприклад, 17)
Вихід:
- Якщо >= 18: "Ви можете голосувати."
- Інакше: "Ви ще не можете голосувати."
*/
//csPell: enable

function canVote(age: number) {
  if (age >= 18 && age <= 100) {
    return 'Yes, you can';
  } else if (age > 0 && age < 18) {
    return 'You cannot vote';
  } else if (age <= 0) {
    return 'It might be too early';
  } else {
    throw new Error('Wrong input');
  }
}

test('Unit test for the canVote function', async () => {
  expect(canVote(-1)).toBe('It might be too early');
  expect(canVote(0)).toBe('It might be too early');
  expect(canVote(10)).toBe('You cannot vote');
  expect(canVote(17)).toBe('You cannot vote');
  expect(canVote(18)).toBe('Yes, you can');
  expect(canVote(100)).toBe('Yes, you can');
  expect(() => canVote(101)).toThrowError(/Wrong input/);
});

//cSpell: disable
/*
5. Порівняння чисел
Порівняйте два числа: виведіть більше, або повідомте, що числа рівні.
Вхід: Два числа (наприклад, 8 і 10)
Вихід:
- "Перше число більше."
- "Друге число більше."
- "Числа рівні."
*/
//cSpell: enable

function compareTwoNumbers(firstNumber: number, secondNumber: number) {
  if (firstNumber === secondNumber) {
    return 'equal';
  } else if (firstNumber > secondNumber) {
    return 'first number if bigger';
  } else if (firstNumber < secondNumber) {
    return 'second number if bigger';
  } else {
    throw new Error('Wrong input');
  }
}

test('Unit test for the compareTwoNumbers function', async () => {
  expect(compareTwoNumbers(10, 8)).toBe('first number if bigger');
  expect(compareTwoNumbers(8, 10)).toBe('second number if bigger');
  expect(compareTwoNumbers(5, 5)).toBe('equal');
  expect(compareTwoNumbers(0, -1)).toBe('first number if bigger');
  expect(compareTwoNumbers(Infinity, -Infinity)).toBe('first number if bigger');
  expect(compareTwoNumbers(-5, -4)).toBe('second number if bigger');
  //@ts-ignore
  expect(() => compareTwoNumbers('str', false)).toThrowError(/Wrong input/);
});

//cSpell: disable
/*
6. Дорога і світлофор
Якщо зелений — переходьте.
Якщо жовтий — підготуйтеся.
Якщо червоний — зачекайте.
Вхід: Колір світлофора (наприклад, "жовтий")
*/
//cSpell: enable

function trafficLight(color: string) {
  if (color === 'green') {
    return 'Go';
  } else if (color === 'yellow') {
    return 'Ready';
  } else if (color === 'red') {
    return 'Wait';
  } else {
    throw new Error(`Wrong input: ${color}`);
  }
}

test('Unit tests for the trafficLight function', async () => {
  expect(trafficLight('green')).toBe('Go');
  expect(trafficLight('yellow')).toBe('Ready');
  expect(trafficLight('red')).toBe('Wait');
  expect(() => trafficLight('pink')).toThrowError(/Wrong input/);
  expect(() => trafficLight('')).toThrowError(/Wrong input/);
});

//cSpell: disable
/*
7. Визначення типу числа
Напишіть програму, яка визначає, чи число додатнє, від’ємне або дорівнює нулю.
Вхід: Число (наприклад, -5)
Вихід:
- "Число додатнє."
- "Число від’ємне."
- "Число дорівнює нулю."
*/
//cSpell: enable

function numberType(number: number) {
  if (number === 0) {
    return 'Number is equal to zero';
  } else if (number > 0) {
    return 'Number is positive';
  } else if (number < 0) {
    return 'Number is negative';
  } else {
    throw new Error(`Wrong input: ${number}`);
  }
}

test('Unit test for the numberType function', async () => {
  expect(numberType(0)).toBe('Number is equal to zero');
  expect(numberType(123e6)).toBe('Number is positive');
  expect(numberType(Infinity)).toBe('Number is positive');
  expect(numberType(-Infinity)).toBe('Number is negative');
  expect(numberType(-5)).toBe('Number is negative');
  expect(() => numberType(NaN)).toThrowError(/Wrong input/);
});
