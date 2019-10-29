import constant from './constant';

const { length, maxTry } = constant;

let raw = '';

let tryN = 0;

export function reset(): string {
  tryN = 0;
  let res = '';
  const t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * t.length);
    res += `${t[index]}`;
    t.splice(index, 1);
  }
  return res;
}

raw = reset();

export async function guess(str: string): Promise<[boolean, string, string]> {
  tryN += 1;
  if (tryN === constant.maxTry) {
    raw = reset();
    return [false, 'Try too many times. Reset the code.', ''];
  }
  const s = str.split('');
  const r = raw.split('');
  if (str === 'yoshino-s') {
    return [false, raw, 'niconiconi'];
  }
  if (str === 'author') {
    return [false, 'Cui Chenyang', 'niconiconi'];
  }
  if (str.length !== length) {
    return [false, 'Wrong length.', ''];
  }
  let a = 0;
  let b = 0;
  for (let i = 0; i < length; i += 1) {
    if (s[i] < '0' || s[i] > '9') {
      return [false, 'Wrong character.', ''];
    }
    if (s[i] === r[i]) {
      a += 1;
      s[i] = '';
      r[i] = '';
    }
  }
  if (a === length) {
    const code = await constant.code();
    return [true, `Congratulation! Correct. And the code is ${code}`, code];
  }
  for (let i = 0; i < length; i += 1) {
    if (s[i] !== '') {
      for (let j = 0; j < length; j += 1) {
        if (s[i] === r[j]) {
          s[i] = '';
          r[j] = '';
          b += 1;
          break;
        }
      }
    }
  }

  return [false, `${a}A${b}B`, ''];
}
