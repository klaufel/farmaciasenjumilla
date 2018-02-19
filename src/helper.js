// helper.js

export function getIndex(value, arr, prop) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

export function removeWhiteSpaces(string) {
  var i = 0, length = string.length;
  for (i; i < length; i++) {
     string = string.replace(' ', '');
  }
  return string;
}


export function getDateActual() {
  const date = new Date();
  return date.getDate() + '/' + ((date.getMonth() < 9 ? '0': '') + (date.getMonth()+1))  + '/' + date.getFullYear();
}
