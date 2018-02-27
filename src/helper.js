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


export function convertUrl(string) {
  var i = 0, length = string.length;
  for (i; i < length; i++) {
     string = string.replace(' ', ',+');
  }
  return string;
}


export function getDateActual() {
  const date = new Date();
  return date.getDate() + '/' + ((date.getMonth() < 9 ? '0': '') + (date.getMonth()+1))  + '/' + date.getFullYear();
}

export function getDayWeekNumber(){
  const date = new Date();
  const days = [7, 1, 2, 3, 4, 5, 6];
  return days[date.getDay()];
};

export function getDayWeekString(){
  const date = new Date();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];
  return days[date.getDay()];
};
