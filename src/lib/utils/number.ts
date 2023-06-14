export function padLeft(value: number, length: number, char = "0") {
  return value.toString().padStart(length, char);
}
