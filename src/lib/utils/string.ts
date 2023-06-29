export function searchableLocationName(name: string) {
  const words = name.match(/[a-zA-Z]+/g) || [];
  const firstWord = words[0] || "";
  return firstWord.toLowerCase();
}
