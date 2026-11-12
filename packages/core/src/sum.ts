// Warm-up for the first red -> green cycle. Delete once real decoder tests exist.
export function sum(numbers: Array<number>): number {
  let sum : number = 0;
  numbers.forEach(number => {
    sum += number;
  });
  return sum;
}
