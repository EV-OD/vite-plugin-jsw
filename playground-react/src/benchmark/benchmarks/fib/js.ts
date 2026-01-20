export function fibJs(n: number) {
  if (n < 2) return n
  return fibJs(n - 1) + fibJs(n - 2)
}