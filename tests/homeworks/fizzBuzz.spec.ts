import { test, expect } from '@playwright/test';

//cSpell: disable
// Якщо число ділиться на 3, виведіть "Fizz".
// Якщо число ділиться на 5, виведіть "Buzz".
// Якщо число ділиться і на 3, і на 5, виведіть "FizzBuzz".
// В іншому випадку, виведіть саме число.
//cSpell: enable

const inputArray: Array<number> = [0, 1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 30, 50];

function isFizzBuzz(numberToCheck: number){
    if(numberToCheck % 3 ===0 && numberToCheck % 5 === 0){
        return 'FizzBuzz'
    }
    if(numberToCheck % 3 ===0){
        return 'Fizz'
    }
    if(numberToCheck % 5===0){
        return 'Buzz'
    }else{
        return numberToCheck.toString();
    } 
}

test('FizzBuzz unit test', async()=>{
    for(const element of inputArray)
    console.log(isFizzBuzz(element));
})
