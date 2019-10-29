export default {
  length: 6,
  maxTry: 23333,
  code(): string {
    return `qa5sw0Rb-${btoa(new Date().getTime().toString())}`;
  },
};
