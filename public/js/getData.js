'use stict';
//api wrapper to get data
class CovidAPI {
  static getAll(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.covid19api.com/summary', true);
    xhr.onload = function() {
      //if request successful
      if (this.status == 200) {
        const response = JSON.parse(this.responseText);
        cb(response);
      }
    }
    cb(false);
    xhr.send();
  }
}

//local storage wrapper to get favorite data
class LocalFavorites {
  static getAll(cb) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    cb(favorites);
  }
}
