export function printRed(...msg: any) {
  console.log('\x1b[31m', msg);
}

export function printGreen(...msg: any) {
  console.log('\x1b[32m', msg);
}

export function printcyan(...msg: any) {
  console.log('\x1b[36m', msg);
}
