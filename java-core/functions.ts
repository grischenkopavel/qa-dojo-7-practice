import { text } from 'stream/consumers';

//bad practice approach
function workWithParams(a: string, b: number, c: boolean | undefined) {
  console.log(a);
  console.log(b);
  console.log(c);
}

workWithParams('str', 123, undefined);

function workWithParamsAsObject(data: {
  a: string | undefined;
  b: number | undefined;
  c: boolean | undefined;
}) {
  console.log(data.a);
  console.log(data.b);
  console.log(data.c);
}

const argument = {
  a: 'text',
  b: 5,
  c: undefined,
};
workWithParamsAsObject(argument);
