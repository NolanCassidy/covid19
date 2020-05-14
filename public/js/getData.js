'use stict';

// loads data request
function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.covid19api.com/summary', true);
  return xhr
}
