// src/utils/conversionUtils.js

export const conversionFunctions = {
  binary: (input) => parseInt(input, 2),
  octal: (input) => parseInt(input, 8),
  hexadecimal: (input) => parseInt(input, 16),
  decimal: (input) => parseInt(input, 10),
};

export function floatToFraction(number) {
  const tolerance = 0.000001;
  let numeratorvalue = 1;
  let denominatorvalue = 1;
  let error = number - numeratorvalue / denominatorvalue;

  while (Math.abs(error) > tolerance) {
    if (error > 0) numeratorvalue++;
    else denominatorvalue++;
    error = number - numeratorvalue / denominatorvalue;
  }
  return {
    numerator: numeratorvalue,
    denominator: denominatorvalue,
  };
}

export function roundToKthInteger(number, k) {
  const multiplier = Math.pow(10, k);
  return Math.round(number * multiplier) / multiplier;
}

export function roundToSignificantDigits(number, significantDigits) {
  if (significantDigits <= 0) return 0;
  const multiplier = Math.pow(
    10,
    significantDigits - Math.floor(Math.log10(Math.abs(number))) - 1
  );
  const roundedNumber = Math.round(number * multiplier) / multiplier;
  return roundedNumber;
}
