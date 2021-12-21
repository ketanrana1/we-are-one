const generateRandomCode = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomNumberBetween = (min: number, max: number) => {
  const num = (Math.random() * (max - min) + min);
  return num.toString();
};

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

function isNumeric(str: any) {
  if (typeof str !== 'string') return false; // we only process strings!
  return !Number.isNaN(str) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    && !Number.isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}

export {
  generateRandomCode,
  getRandomNumberBetween,
  randomNumber,
  isNumeric,
  sleep,
};
