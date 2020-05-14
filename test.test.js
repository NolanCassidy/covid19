//test.test.js file.
const testData = require('./js/getData');
test('getData() made successful call to the API', () => {expect(testData()).toBe(0);});
