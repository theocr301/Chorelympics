export function parseName(name: string): string {
  name = name.toLowerCase().trim();
  let result = '';

  for (let i = 0; i < name.length; i++) {
    if (i === 0 || name[i - 1] === '0' || name[i - 1] === ' ') {
      result += name[i].toUpperCase();
    } else {
      result += name[i];
    }
  }

  result = result.replace(/%20/g, ' ');

  return result;
}