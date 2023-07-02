export function padLeft(value: number, length: number, char = "0") {
  return value.toString().padStart(length, char);
}

export function lookup<T>(value: number, table: Record<number, T>): T {
  // Find the first key that is greater than or equal to the value
  const key = Object.keys(table)
    .map((key) => parseInt(key))
    .find((key) => key >= value);

  // @ts-ignore
  return table[key] || table[Object.keys(table).pop()];
}

export function round(value: number, decimals: number) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
