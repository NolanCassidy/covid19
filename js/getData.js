'use stict';

// loads data request
function getData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.covid19api.com/summary', true);
  return xhr
}

const testData = () => getData().status;
module.exports = testData;
