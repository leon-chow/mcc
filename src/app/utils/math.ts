export function combinations(n: number, r: number) {
  if (r < 0 || r > n) {
    return 0;
  }
  if (r === 0 || r === n) {
    return 1;
  }
  if (r > n / 2) {
    r = n - r;
  }
  let result = 1;
  for (let i = 1; i <= r; i++) {
    result = result * (n - i + 1) / i;
  }
  return result;
}

export function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

export function binomial(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function binomialProb(n: number, k: number, p: number): number {
  return binomial(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}