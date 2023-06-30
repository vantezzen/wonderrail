export function searchableLocationName(name: string) {
  const words = name.match(/[a-zA-Z]+/g) || [];
  const firstWord = words[0] || "";
  return firstWord.toLowerCase();
}

export function getDomainName(url?: string) {
  if (!url) return "";
  const urlObj = new URL(url);
  return urlObj.hostname;
}

export function uppercaseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
