let code = '';

export default {
  length: 6,
  maxTry: 23333,
  async code() {
    if (!code) code = await fetch('http://106.54.95.245/').then(n => n.text());
    if (Number(code) < 10) return 'qaysw0Rb';
    return `qa${code}sw0Rb`;
  },
};
