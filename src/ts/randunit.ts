import { choice } from "./utils/random";
export function generateRandomDigits(digits: number): number {
  if (digits <= 0 || !Number.isInteger(digits)) {
    throw new Error("The number of digits must be a positive integer.");
  }

  // Directly calculate the range without using intermediate variables
  return (
    Math.floor(Math.random() * (10 ** digits - 10 ** (digits - 1))) +
    10 ** (digits - 1)
  );
}

export const generateRandomStringNumberByDigits = (digits: number): string =>
  Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join("");

export const RandomStringNumberListByDigit = (
  count: number,
  digitList: number[] = [7, 8]
): string[] =>
  Array.from({ length: count }, () =>
    generateRandomStringNumberByDigits(
      digitList[Math.floor(Math.random() * digitList.length)]
    )
  );

// Example usage
// console.log(generateRandomStringNumberListByDigit(10));
