export function checkPis(pis: string) {
  const ftap: any = '3298765432';
  let total = 0;
  let rest: any;
  let strResto = '';
  const numPIS: any = pis;

  rest = 0;
  if (numPIS == '' || numPIS == null) {
    return false;
  }

  for (let i = 0; i <= 9; i++) {
    const result = numPIS.slice(i, i + 1) * ftap.slice(i, i + 1);
    total = total + result;
  }

  rest = total % 11;

  if (rest != 0) {
    rest = 11 - rest;
  }

  if (rest == 10 || rest == 11) {
    strResto = rest + '';
    rest = strResto.slice(1, 2);
  }

  if (rest != numPIS.slice(10, 11)) {
    return false;
  }

  return true;
}
