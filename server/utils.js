exports.parseName = function (name) {
  name = name.toLowerCase().trim();
  let result = '';
  for (let i = 0; i < name.length; i++) {
    if (name[i-1] === undefined || name[i-1] === '-') {
      result += name[i].toUpperCase();
    } else {
      result += name[i];
    }
  }
  result = result.replaceAll('-', ' ');

  return result;
}