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

export function hexToRgbColor(hex: string) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}
